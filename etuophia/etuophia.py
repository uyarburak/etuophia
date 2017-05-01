# -*- coding: utf-8 -*-
"""
    Etuophia
    ~~~~~~~~

    A course management application written with Flask and sqlite3.

    :copyright: (c) 2017 by Burak UYAR.
"""

import os
import time
import collections
from sqlite3 import dbapi2 as sqlite3
from hashlib import md5
from datetime import datetime
from flask import Flask, request, session, url_for, redirect, \
     render_template, abort, g, flash, _app_ctx_stack
from werkzeug import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from flask_login import LoginManager, login_required, logout_user, login_user, UserMixin, current_user

# configuration
DATABASE = '/tmp/etuophia.db'
PER_PAGE = 30
DEBUG = True
SECRET_KEY = 'development key'

UPLOAD_FOLDER = '/files'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('ETUOPHIA_SETTINGS', silent=True)
app.config['UPLOAD_FOLDER'] = os.path.dirname(__file__) + UPLOAD_FOLDER

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
    top.sqlite_db.execute("PRAGMA foreign_keys = ON")
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


def is_enroll(member_id, course_id):
    """None means no enrollment, 0 is normal user, 1 is admin."""
    rv = query_db('select is_admin from enrollment where member_id = ? and course_id = ?',
                  [member_id, course_id], one=True)
    return rv[0] if rv else None


def get_member(member_id):
    """Return membership info by member_id. if member is an instructor, instructor field will be True otherwise, False"""
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


def update_last_read(topic_id):
    """Updates last read datetime for current user at topic_id"""
    db = get_db()
    db.execute('insert or replace into read_history (member_id, topic_id) values(?, ?)', (current_user.id, topic_id));
    db.commit()


def update_session_course(course_id):
    """Updates course_id in session"""
    session['course_id'] = course_id;


@app.before_request
def before_request():
    if(request.endpoint):
        print("before request: " + request.endpoint);


@app.route('/')
@login_required
def home():
    course_id = session['course_id'] if 'course_id' in session else None;
    enrollment_type = None;
    #if course_id in session, check if current user enrolled to this course
    if course_id:
        enrollment_type = is_enroll(current_user.id, course_id);
    # if user didnt enroll or course_id doesnt exist in session, find a random course to redirect
    if enrollment_type == None:
        course_id = None;
        random_course = query_db('select * from enrollment where member_id = ? LIMIT 1',
                                [current_user.id], one=True);
        if random_course:
            course_id = random_course['course_id'];
    if course_id:
        return redirect(url_for('course_main', course_id=course_id));
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


@app.route('/course/<course_id>/topic/<topic_id>/delete', methods=['POST'])
@login_required
def delete_topic(course_id, topic_id):
    if(is_enroll(current_user.id, course_id)):
        db = get_db()
        db.execute('delete from topic where course_id=? and topic_id=?',
                  [course_id, topic_id])
        db.commit()
        return redirect(url_for('course_main', course_id=course_id));
    return abort(401)

@app.route('/course/<course_id>/topic/<topic_id>/comment/<comment_id>/delete_completely', methods=['POST'])
@login_required
def delete_comment(course_id, topic_id, comment_id):
    if(is_enroll(current_user.id, course_id)):
        db = get_db()
        db.execute('''delete from comment where comment_id in
            (select comment.comment_id from comment, topic where topic.course_id = ? and comment.topic_id=? and comment.topic_id = topic.topic_id
            and comment.comment_id=?)''', [course_id, topic_id, comment_id])
        db.commit()
        return redirect(url_for('topic', course_id=course_id, topic_id=topic_id));
    return abort(401)

@app.route('/course/<course_id>/topic/<topic_id>/comment/<comment_id>/delete_content', methods=['POST'])
@login_required
def delete_comment_content(course_id, topic_id, comment_id):
    if(is_enroll(current_user.id, course_id)):
        db = get_db()
        db.execute('''update comment set content='The content of this comment has removed.' where comment_id in
            (select comment.comment_id from comment, topic where topic.course_id = ? and comment.topic_id=? and comment.topic_id = topic.topic_id
            and comment.comment_id = ?)''', [course_id, topic_id, comment_id])
        db.commit()
        return redirect(url_for('topic', course_id=course_id, topic_id=topic_id));
    elif(is_enroll(current_user.id, course_id) == 0):
        db = get_db()
        db.execute('''update comment set comment.content='The content of this comment has removed.' where comment_id in
            (select comment.comment_id from comment, topic where topic.course_id = ? and comment.topic_id=? and comment.topic_id = topic.topic_id and comment.comment_id=?
            and comment.author_id = ?)''', [course_id, topic_id, comment_id, current_user.id])
        db.commit()
        return redirect(url_for('topic', course_id=course_id, topic_id=topic_id));
    return abort(401)


@app.route('/course/<course_id>/topic/<topic_id>/add_comment', methods=['POST'])
@login_required
def add_comment(course_id, topic_id):
    if request.form['comment_content']:
        form = request.form;
        db = get_db()
        db.execute('''insert into comment (content, is_anonymous, topic_id, parent_id, author_id) values
         (?, ?, ?, ?, ?)''', (form['comment_content'], form['is_anonymous'], topic_id, form['parent_id'], current_user.id));
        db.commit()
    return redirect(url_for('topic', course_id=course_id, topic_id=topic_id));


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/course/<course_id>/resource/<resource_id>', methods=['POST'])
@login_required
def change_resource_type(course_id, resource_id):
    if request.form['type'] != None:
        db = get_db()
        db.execute('''update resource set type = ? where resource_id = ? and course_id = ?
            ''', (request.form['type'], resource_id, course_id));
        db.commit()
    return redirect(url_for('resources', course_id=course_id))


@app.route('/course/<course_id>/delete_res/<resource_id>', methods=['POST'])
@login_required
def delete_resource(course_id, resource_id):
    file = query_db('select * from resource where resource_id = ? and course_id = ?',
                            [resource_id, course_id], one=True)
    try:
        os.remove(app.config['UPLOAD_FOLDER'] + "/" + file['resource_title']);
    except:
        print("dammnn")
    db = get_db()
    db.execute('''delete from resource where resource_id = ? and course_id = ?
        ''', (resource_id, course_id));
    db.commit()
    return redirect(url_for('resources', course_id=course_id))


@app.route('/course/<course_id>/add_resource/<resource_type>', methods=['POST'])
@login_required
def add_resource(course_id, resource_type):
    add_res(course_id, resource_type, request);
    return redirect(url_for('resources', course_id=course_id))

@app.route('/course/<course_id>/homework/<homework_id>', methods=['POST'])
@login_required
def add_resource_student(course_id, homework_id):
    add_res(course_id, -1, request, homework_id);
    return redirect(url_for('resources', course_id=course_id))

def add_res(course_id, resource_type, request, commited_hw_id='null'):
    # check if the post request has the file part
    if 'file' not in request.files:
        print('No file part')
        return -1;
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        print('No selected file')
        return 0;
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        db = get_db()
        cur = db.cursor();
        cur.execute('''insert into resource (url, course_id, member_id, resource_title, type, commited_hw_id) values
         (?, ?, ?, ?, ?, ?)''', (UPLOAD_FOLDER+"/"+filename, course_id, current_user.id, filename, resource_type, commited_hw_id));
        db.commit()
        return cur.lastrowid;

@app.route('/course/<course_id>/add_homework', methods=['POST'])
@login_required
def add_homework(course_id):
    res_id = add_res(course_id, 0, request);
    if res_id > 0:
        lock_type = 1 if request.form.get('lock_type') else 0;
        deadline = datetime.strptime(request.form['deadline'], '%d/%m/%Y %H:%M');
        db = get_db()
        db.execute('''insert into homework (deadline, lock_type, resource_id) values
         (?, ?, ?)''', (deadline, lock_type, res_id));
        db.commit()
    return redirect(url_for('resources', course_id=course_id))


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
    print(query_db('select comment.* from topic, comment where comment.topic_id = topic.topic_id and topic.course_id = ?',
                            [course_id], one=False));
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
    topics_all = query_db('select topic.*, read_history.*, read_history.last_read < topic.last_modified as is_new from topic left join read_history on read_history.member_id = ? and read_history.topic_id = topic.topic_id where topic.course_id = ? order by topic.create_time desc',
                            [current_user.id, course_id], one=False)
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
    update_session_course(course_id);
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
    update_last_read(topic_id);
    return render_template('topic.html', comments=ordered, topic=topic, current_course=common['current_course'], is_admin=common['is_admin'], topics=common['topics'], courses=common['courses']);

@app.route('/course/<course_id>/resources')
@login_required
def resources(course_id):
    common = common_things(course_id);
    if not common:
        return "You do not have permission to see it.";
    resources_db = query_db('select * from resource, member where resource.course_id = ? and resource.member_id = member.member_id and resource.type', [course_id], one=False)
    resources = [[], [], [], []]
    for resource in resources_db:
        resources[resource['type']-1].append(resource);
    print(resources);
    if common['is_admin']:
        homeworks = query_db('select * from resource, member, homework where resource.course_id = ? and resource.member_id = member.member_id and resource.resource_id = homework.resource_id', [course_id], one=False)
        return render_template('resources_admin.html', homeworks=homeworks, resources=resources, current_course=common['current_course'], is_admin=common['is_admin'], topics=common['topics'], courses=common['courses']);
    else:
        homeworks = query_db('''

            SELECT r.resource_id, r.resource_title, r.url, r.pub_date, m.name, h.deadline, h.hw_id, s.resource_id as STUDENT_HW_ID, CASE WHEN h.lock_type = 1 THEN datetime('now') >  h.deadline ELSE h.lock_type = 2 END AS IS_LOCK FROM homework h LEFT JOIN resource s ON s.commited_hw_id = h.hw_id AND s.member_id = ?, resource r INNER JOIN member m ON r.member_id = m.member_id where r.course_id = ? AND r.type = 0 and r.resource_id  = h.resource_id order by r.pub_date
                ''', [current_user.id, course_id], one=False)
        return render_template('resources_student.html', homeworks=homeworks, resources=resources, current_course=common['current_course'], is_admin=common['is_admin'], topics=common['topics'], courses=common['courses']);


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