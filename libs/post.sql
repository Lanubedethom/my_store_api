create table tasks (
                     id serial primary key,
                     title varchar (255) not null,
                     completed boolean default false
);

select * from tasks where id = ?;

insert into tasks (title) values (?)
