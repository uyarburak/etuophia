# -*- coding: utf-8 -*-
"""
    Etuophia
    ~~~~~~~~

    A course management application written with Flask and sqlite3.

    :copyright: (c) 2017 by Burak UYAR.
"""

import time
from sqlite3 import dbapi2 as sqlite3
from hashlib import md5
from datetime import datetime
from flask import Flask, request, session, url_for, redirect, \
     render_template, abort, g, flash, _app_ctx_stack
from werkzeug import check_password_hash, generate_password_hash


# configuration
DATABASE = '/tmp/etuophia.db'
PER_PAGE = 30
DEBUG = True
SECRET_KEY = 'development key'

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('ETUOPHIA_SETTINGS', silent=True)


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
    return datetime.utcfromtimestamp(timestamp).strftime('%d/%m/%Y')


def format_datetime(timestamp):
    """Format a timestamp for display."""
    return datetime.utcfromtimestamp(timestamp).strftime('%d/%m/%Y @ %H:%M')

#None means no enrollment, 0 is normal user, 1 is admin
def is_enroll(member_id, course_id):
    rv = query_db('select is_admin from enrollment where member_id = ? and course_id = ?',
                  [member_id, course_id], one=True)
    return rv[0] if rv else None


@app.before_request
def before_request():
    if(request.endpoint):
        print("before request: " + request.endpoint);
    g.user = None
    if 'member_id' in session:
        g.user = query_db('select * from member where member_id = ?',
                          [session['member_id']], one=True)
    if not g.user and (request.endpoint != 'login' and request.endpoint != 'login_page'):
        return redirect(url_for('login_page'), 0);


@app.route('/')
def home():
    print(g.user['name'] + " at home");
    return format_datetime(int(time.time()));


#Temporary login system
@app.route('/login')
def login_page():
    #if user is already logged in, redirect to home page  
    if g.user:
        return redirect(url_for('home'));
    return 'login please';

#Temporary login system
@app.route('/login/<member_id>')
def login(member_id):  
    if not g.user:
        session['member_id'] = member_id;
    return redirect(url_for('home'));


@app.route('/course/<course_id>')
def course_main(course_id):
    enrollment_type = is_enroll(g.user['member_id'], course_id);
    if enrollment_type == None:
        return "You do not have permission to see it.";
    course = query_db('select * from course where course_id = ?',
                            [course_id], one=True)
    return render_template('course.html', course=course, is_admin=enrollment_type);

#Temporary login system
@app.route('/logout')
def logout():
    #if user is already logged in, redirect to home page
    session['member_id'] = None;
    return redirect(url_for('login_page'));

# add some filters to jinja
app.jinja_env.filters['datetimeformat'] = format_datetime