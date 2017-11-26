set names utf8;
drop database if exists blog;
create database blog;
use blog;
create table user(
    uid int primary key auto_increment,
    username varchar(255) not null unique,
    password varchar(255) not null
);

create table article(
    aid int primary key auto_increment,
    title varchar(255) not null,
    create_time datetime not null default now(),
    content mediumtext not null,
    photo varchar(255),
    uid int not null
);

alter table article add constraint article_fk_uid
foreign key (uid) references user(uid);