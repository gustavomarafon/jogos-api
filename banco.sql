create table produtora (
codigo serial not null primary key, 
nome varchar(50) not null);

create table jogo (
codigo serial not null primary key,
nome varchar(50) not null, 
genero varchar(50) not null, 
produtora integer not null, 
foreign key (produtora) references produtora (codigo));

-- inserir alguns registros
insert into produtora (nome) values ('valve') , 
('riot'), ('mojang');

insert into jogo (nome, genero, produtora) values
('league of legends','moba',2),
('minecraft','aventura',3),
('couter strike', 'fps',1);