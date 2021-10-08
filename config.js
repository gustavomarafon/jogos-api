require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const {Pool} = require('pg')

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isProduction ? false : {
    rejectUnauthorized: false
  }
})

function db_seed(){
  pool.query(`
    insert into produtora (nome) values ('valve') , 
    ('riot'), ('mojang');
    
    insert into jogo (nome, genero, produtora) values
    ('league of legends','moba',2),
    ('minecraft','aventura',3),
    ('couter strike', 'fps',1);
  `)
}

function db_migrate(){
  pool.query(`
    create table if not exists produtora (
    codigo serial not null primary key, 
    nome varchar(50) not null);
    
    create table if not exists jogo (
    codigo serial not null primary key,
    nome varchar(50) not null, 
    genero varchar(50) not null, 
    produtora integer not null, 
    foreign key (produtora) references produtora (codigo));
  `)
}

module.exports = {pool, db_migrate,db_seed}