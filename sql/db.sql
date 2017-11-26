set names utf8;
drop database if exists blog;
create database blog;
use blog;
create table user(
    uid int primary key auto_increment,
    username varchar(255) not null unique,
    password varchar(255) not null
);