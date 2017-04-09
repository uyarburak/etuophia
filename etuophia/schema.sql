PRAGMA foreign_keys = ON;
drop table read_history;
drop table news;
drop table homework;
drop table resource;
drop table comment;
drop table enrollment;
drop table student;
drop table instructor;
drop table topic;
drop table course;
drop table member;

create table member (
  member_id integer primary key autoincrement,
  sex integer,
  image_url text,
  mail text unique,
  name text,
  password text
);

create table instructor (
  member_id integer primary key,
  office text,
  tel text,
  website text,
  FOREIGN KEY(member_id) REFERENCES member(member_id)
);

create table student (
  member_id integer primary key,
  student_id text,
  year integer,
  department text,
  FOREIGN KEY(member_id) REFERENCES member(member_id)
);

create table course (
  course_id text primary key,
  course_title not null,
  description text,
  syllabus text
);

create table enrollment (
  member_id integer not null,
  course_id text not null,
  is_admin integer default 0,
  PRIMARY KEY (member_id, course_id),
  FOREIGN KEY(course_id) REFERENCES course(course_id),
  FOREIGN KEY(member_id) REFERENCES member(member_id)
);

create table topic (
  topic_id integer primary key autoincrement,
  content text not null,
  create_time datetime default current_timestamp,
  title text not null,
  locked integer default 0,
  last_modified datetime default 0,
  course_id text not null,
  author_id integer not null,
  FOREIGN KEY(course_id) REFERENCES course(course_id),
  FOREIGN KEY(author_id) REFERENCES member(member_id)
);

create table comment (
  comment_id integer primary key autoincrement,
  content text,
  comment_time datetime default current_timestamp,
  is_anonymous integer,
  author_id integer not null,
  parent_id integer,
  topic_id integer,
  FOREIGN KEY(topic_id) REFERENCES topic(topic_id) ON DELETE CASCADE,
  FOREIGN KEY(author_id) REFERENCES member(member_id),
  FOREIGN KEY(parent_id) REFERENCES comment(comment_id) ON DELETE CASCADE
);

create trigger if not exists update_last_modified after insert on comment
  begin
    update topic set last_modified = NEW.COMMENT_TIME where TOPIC_ID = NEW.TOPIC_ID;
  end;

create table resource (
  resource_id integer primary key autoincrement,
  pub_date datetime default current_timestamp,
  url text,
  commited_hw_id integer,
  course_id text,
  member_id integer,
  resource_title text not null,
  type integer not null,
  UNIQUE (commited_hw_id, member_id) ON CONFLICT REPLACE
);

create table homework (
  hw_id integer primary key autoincrement,
  deadline datetime not null,
  lock_type integer not null,
  resource_id integer,
  FOREIGN KEY(resource_id) REFERENCES resource(resource_id)
);

create table news (
  news_id integer primary key autoincrement,
  title text not null,
  summary text not null,
  url text not null,
  image_url text not null,
  active integer not null
);

create table read_history (
  member_id integer not null,
  topic_id integer not null,
  last_read datetime default current_timestamp,
  PRIMARY KEY (member_id, topic_id) ON CONFLICT REPLACE,
  FOREIGN KEY(topic_id) REFERENCES topic(topic_id) ON DELETE CASCADE,
  FOREIGN KEY(member_id) REFERENCES member(member_id)
);