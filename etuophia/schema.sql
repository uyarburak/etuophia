drop table if exists topic;
create table topic (
  topic_id integer primary key autoincrement,
  content text not null,
  create_time integer not null,
  title text not null,
  locked integer,
  last_modified integer,
  course_id integer not null,
  author_id integer not null
);

drop table if exists comment;
create table comment (
  comment_id integer primary key autoincrement,
  content text,
  comment_time integer,
  is_anonymous integer,
  author_id integer not null,
  parent_id integer,
  topic_id integer
);

drop table if exists course;
create table course (
  course_id text primary key,
  course_title not null,
  description text,
  syllabus text
);

drop table if exists enrollment;
create table enrollment (
  member_id integer not null,
  course_id text not null,
  is_admin integer,
  PRIMARY KEY (member_id, course_id)
);

drop table if exists homework;
create table homework (
  hw_id integer primary key autoincrement,
  deadline integer not null,
  lock_type integer not null,
  resource_id integer
);

drop table if exists instructor;
create table instructor (
  member_id integer primary key,
  office text,
  tel text,
  website text
);

drop table if exists student;
create table student (
  member_id integer primary key,
  student_id text,
  year integer,
  department text
);

drop table if exists member;
create table member (
  member_id integer primary key autoincrement,
  sex integer,
  image_url text,
  mail text,
  name text,
  password text
);

drop table if exists news;
create table news (
  news_id integer primary key autoincrement,
  title text not null,
  summary text not null,
  url text not null,
  image_url text not null,
  active integer not null
);

drop table if exists read_history;
create table read_history (
  member_id integer not null,
  topic_id integer not null,
  last_read integer not null,
  PRIMARY KEY (member_id, topic_id)
);

drop table if exists resource;
create table resource (
  resource_id integer primary key autoincrement,
  pub_date integer,
  url text,
  commited_hw_id integer,
  course_id text,
  member_id integer,
  resource_title text not null,
  type integer not null
);