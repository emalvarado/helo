create table users (
id serial primary key,
username varchar(20),
password text,
profile_pic text
);


create table posts (
id serial primary key,
title varchar(45),
img text,
content text,
author_id integer references users(id)
);


insert into users(username, password, profile_pic)
values ('a', 'a', 'a'), ('b', 'b', 'b'), ('c', 'c', 'c'), ('d', 'd', 'd');

insert into posts (title, img, content, author_id)
values ('c', 'c', 'c', 3), ('a', 'a', 'a', 1), ('d', 'd', 'd', 4), ('b', 'b', 'b', 2);

