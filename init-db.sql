-- init-db.sql

-- Criação de um usuário com todas as permissões
CREATE DATABASE IF NOT EXISTS USERDB;

CREATE USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;
