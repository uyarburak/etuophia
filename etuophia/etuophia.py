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


@app.before_request
def before_request():
    print("before request: " + request.endpoint);
    g.user = None
    if 'member_id' in session:
        g.user = query_db('select * from member where member_id = ?',
                          [session['member_id']], one=True)
    if not g.user and request.endpoint != 'login':
        return redirect(url_for('login'));


@app.route('/')
def home():
    print("home sweet home");
    if not g.user:
        return format_datetime(int(time.time()));
    return format_datetime(int(time.time()));

@app.route('/login')
def login():
    print("login babe");
    return 'hi poor thing';


# add some filters to jinja
app.jinja_env.filters['datetimeformat'] = format_datetime