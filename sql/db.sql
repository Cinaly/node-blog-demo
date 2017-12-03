set names utf8;

drop database if exists blog;
create database blog charset=utf8;

use blog;

create table user (
    uid int primary key auto_increment,
    uname varchar(255) not null unique,
    upwd varchar(255) not null,
    avatar varchar(255) default 'default.svg'
);

create table post(
    pid int primary key auto_increment,
    title varchar(255) not null,
    content mediumtext not null,
    addtime datetime default now(),
    uid int
);