CREATE DATABASE IF NOT EXISTS db_nutrition;

USE db_nutrition;

CREATE TABLE IF NOT EXISTS nutritionist (
     id_nutritionist INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (45) NOT NULL,
    last_name VARCHAR (45) NOT NULL,
    user VARCHAR (45) NOT NULL,
    password VARCHAR (45) NOT NULL,
    email VARCHAR (45) NOT NULL,
    registration_number VARCHAR (45) NOT NULL,
    phone_number VARCHAR (45) NOT NULL,
    birth_date DATE NOT NULL,
    
    PRIMARY KEY (id_nutritionist)
);