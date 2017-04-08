# -*- coding: utf-8 -*-
"""
    Etuophia
    ~~~~~~~~

    A course management application written with Flask and sqlite3.

    :copyright: (c) 2017 by Burak UYAR.
"""

import time
import collections
from sqlite3 import dbapi2 as sqlite3
from hashlib import md5
from datetime import datetime
from flask import Flask, request, session, url_for, redirect, \
     render_template, abort, g, flash, _app_ctx_stack
from werkzeug import check_password_hash, generate_password_hash
from flask_login import LoginManager, login_required, logout_user, login_user, UserMixin, current_user

# configuration
DATABASE = '/tmp/etuophia.db'
PER_PAGE = 30
DEBUG = True
SECRET_KEY = 'development key'

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('ETUOPHIA_SETTINGS', silent=True)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    top = _app_ctx_stack.top
    if not hasattr(top, 'sqlite_db'):
        top.sqlite_db = sqlite3.connect(app.config['DATABASE'])
        top.sqlite_db.row_factory = sqlite3.Row
    return top.sqlite_db


@app.teardown_appcontext
def close_database(exception):
    """Closes the database again at the end of the request."""
    top = _app_ctx_stack.top
    if hasattr(top, 'sqlite_db'):
        top.sqlite_db.close()


def run_sql_file(filename):
    """Initializes the database."""
    db = get_db()
    with app.open_resource(filename, mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()


@app.cli.command('initdb')
def initdb_command():
    """Creates the database tables."""
    run_sql_file('schema.sql')
    print('Initialized the database.')

@app.cli.command('populatedb')
def populatedb_command():
    """Creates the database entries."""
    run_sql_file('populate.sql')
    print('Populated the database.')


def query_db(query, args=(), one=False):
    """Queries the database and returns a list of dictionaries."""
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    return (rv[0] if rv else None) if one else rv


def format_date(timestamp):
    """Format a timestamp for only display date."""
    return datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y')


def format_datetime(timestamp):
    """Format a timestamp for display."""
    return datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S').strftime('%d/%m/%Y @ %H:%M')

#None means no enrollment, 0 is normal user, 1 is admin
def is_enroll(member_id, course_id):
    rv = query_db('select is_admin from enrollment where member_id = ? and course_id = ?',
                  [member_id, course_id], one=True)
    return rv[0] if rv else None


def get_instructor(member_id):
    rv = query_db('select * from instructor where member_id = ?',
                  [member_id], one=True)
    return rv[0] if rv else None


def get_member(member_id):
    member = None
    instructor = False

    member = query_db('select member.*, instructor.* from member, instructor where member.member_id = ? and member.member_id = instructor.member_id',
                          [member_id], one=True);
    if member:
        instructor = True;
    else:
        member = query_db('select member.*, student.* from member, student where member.member_id = ? and member.member_id = student.member_id',
                          [member_id], one=True);
    return {'member': member, 'instructor': instructor};


@app.before_request
def before_request():
    if(request.endpoint):
        print("before request: " + request.endpoint);


@app.route('/')
@login_required
def home():
    random_course = query_db('select * from enrollment where member_id = ? LIMIT 1',
                            [current_user.id], one=True);
    if(random_course):
        print(random_course.keys());
        return redirect(url_for('course_main', course_id=random_course['course_id']));
    return "There is no course for you :(";


#Temporary login system
@app.route('/login', methods=['GET', 'POST'])
def login():
    #if user is already logged in, redirect to home page  
    if request.method == 'POST' and request.form['m_id']:
        user = load_user(request.form['m_id'])
        if(user):
            login_user(user)
            return redirect(url_for('home'));
        else:
            return abort(401);
    else:
        members = query_db('select member_id, name from member', [], one=False);
        return render_template('tmp_login.html', members=members);


@app.route('/course/<course_id>/add_topic', methods=['GET', 'POST'])
@login_required
def add_topic(course_id):
    #if user is already logged in, redirect to home page  
    if request.method == 'POST' and request.form['content']:
        form = request.form;
        locked = 1;
        if request.form.get('not_locked'):
            locked = 0;
        db = get_db()
        cur = db.cursor();
        cur.execute('''insert into topic (content, title, locked, course_id, author_id)
         values (?, ?, ?, ?, ?)''', (form['content'], form['topic_title'], locked, course_id, current_user.id));
        db.commit()
        return redirect(url_for('topic', course_id=course_id, topic_id=cur.lastrowid));
    else:
        common = common_things(course_id);
        if not common:
            return "You do not have permission to see it.";
        return render_template('add_topic.html', current_course=common['current_course'], is_admin=common['is_admin'], topics=common['topics'], courses=common['courses']);

@app.route('/course/<course_id>/topic/<topic_id>/add_comment', methods=['POST'])
@login_required
def add_comment(course_id, topic_id):
    #if user is already logged in, redirect to home page  
    if request.form['comment_content']:
        form = request.form;
        db = get_db()
        db.execute('''insert into comment (content, is_anonymous, topic_id, parent_id, author_id) values
         (?, ?, ?, ?, ?)''', (form['comment_content'], form['is_anonymous'], topic_id, form['parent_id'], current_user.id));
        db.commit()
    return redirect(url_for('topic', course_id=course_id, topic_id=topic_id));


@app.route('/course/<course_id>')
@login_required
def course_main(course_id):
    common = common_things(course_id);
    if not common:
        return "You do not have permission to see it.";
    students = query_db('select student.*, member.* from enrollment, student, member where enrollment.member_id = student.member_id and enrollment.course_id = ? and student.member_id = member.member_id and is_admin != 1',
                            [course_id], one=False)
    instructors = query_db('select instructor.*, member.* from enrollment, instructor, member where enrollment.member_id = instructor.member_id and enrollment.course_id = ? and instructor.member_id = member.member_id',
                            [course_id], one=False)
    assistants = query_db('select student.*, member.* from enrollment, student, member where enrollment.member_id = student.member_id and enrollment.course_id = ? and student.member_id = member.member_id and is_admin = 1',
                            [course_id], one=False)
    comment_count = query_db('select count(*) as cnt from topic, comment where comment.topic_id = topic.topic_id and topic.course_id = ?',
                            [course_id], one=True)
    news = query_db('select * from news where active',
                            [], one=False)
    return render_template('dashboard.html', news=news, topic_count=common['topics_count'], comment_count=comment_count['cnt'], students=students, instructors=instructors, assistants=assistants, current_course=common['current_course'], is_admin=common['is_admin'], topics=common['topics'], courses=common['courses']);

def common_things(course_id):
    enrollment_type = is_enroll(current_user.id, course_id);
    if enrollment_type == None:
        return None;
    if(enrollment_type and not current_user.instructor):
        enrollment_type = 2;
    course = query_db('select * from course where course_id = ?',
                            [course_id], one=True)
    courses = query_db('select * from course, enrollment where course.course_id = enrollment.course_id and enrollment.member_id = ?',
                            [current_user.id], one=False)
    topics_all = query_db('select * from topic where course_id = ?',
                            [course_id], one=False)
    week = {'title': 'This week', 'topics': []};
    month = {'title': 'This month', 'topics': []};
    older = {'title': 'Older', 'topics': []};
    now = datetime.now();

    for topic in topics_all:
        delta = now - datetime.strptime(topic['create_time'], '%Y-%m-%d %H:%M:%S');
        if delta.days < 8:
            week['topics'].append(topic);
        elif delta.days < 32:
            month['topics'].append(topic);
        else:
            older['topics'].append(topic);
    topics = [];
    if len(week['topics']):
        topics.append(week);
    if len(month['topics']):
        topics.append(month);
    if len(older['topics']):
        topics.append(older);
    return dict(current_course=course, is_admin=enrollment_type, topics=topics, courses=courses, topics_count=len(topics_all));

@app.route('/course/<course_id>/topic/<topic_id>')
@login_required
def topic(course_id, topic_id):
    common = common_things(course_id);
    if not common:
        return "You do not have permission to see it.";
    topic = query_db('select * from topic, member where topic.course_id = ? and topic.topic_id = ? and topic.author_id = member.member_id',
                            [course_id, topic_id], one=True)
    if not topic:
        return "This topic doesnt belong to course " + course_id;
    comments = query_db('select * from comment, member where comment.topic_id = ? and comment.author_id = member.member_id',
                            [topic_id], one=False)
    recursive_comments = {};
    for comment in comments:
        key = comment['parent_id'] if comment['parent_id'] else 0;
        if not key in recursive_comments:
            recursive_comments[key] = [comment];
        else:
            recursive_comments[key].append(comment);
    ordered = collections.OrderedDict(sorted(recursive_comments.items()))
    print(ordered);
    return render_template('topic.html', comments=ordered, topic=topic, current_course=common['current_course'], is_admin=common['is_admin'], topics=common['topics'], courses=common['courses']);


#Temporary login system
@app.route('/logout')
def logout():
    logout_user();
    return redirect(url_for('login'));


@login_manager.unauthorized_handler
def unauthorized_handler():
    print("unauthorized");
    return redirect(url_for('login'), 0);


# callback to reload the user object        
@login_manager.user_loader
def load_user(userid):
    print(userid);
    info = get_member(userid);
    if(info['member']):
        return User(int(userid), info['instructor'], info['member']);
    return None;


# silly user model
class User(UserMixin):

    def __init__(self, id, instructor, obj):
        self.id = id
        self.instructor = instructor
        self.member = obj
        
    def __repr__(self):
        return "%d/%s" % (self.id, self.member['name'])


# add some filters to jinja
app.jinja_env.filters['datetimeformat'] = format_datetime
app.jinja_env.filters['dateformat'] = format_date