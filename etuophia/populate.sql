insert into member values (null, 0, '', 'buyar@example.com', 'Burak', 'pass');
insert into member values (null, 1, '', 'blabla@example.com', 'Emel', 'pass');

insert into course values
	('1', '#1 Course', 'blabla', 'syllabus url'),
	('2', '#2 Course', 'blabla2', 'syllabus url2'),
	('3', '#3 Course', 'blabla3', 'syllabus url3');

insert into enrollment (member_id, course_id, is_admin) values
	(1, '1', 0),
	(1, '2', 1),
	(2, '2', 0);

insert into topic (content, title, locked, course_id, author_id) values
	('blabla content', "title 1", 0, '1', 1),
	('blabla content2', "title 2", 1, '1', 1),
	('blabla content3', "title 3", 0, '2', 1),
	('blabla content4', "title 4", 1, '2', 1),
	('blabla content5', "title 5", 0, '2', 2),
	('blabla content6', "title 6", 1, '2', 2);