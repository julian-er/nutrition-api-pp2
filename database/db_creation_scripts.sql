CREATE DATABASE IF NOT EXISTS db_nutrition;

USE db_nutrition;

/*
 Remove int width because it's deprecated -> mysql warning 1681 
 */
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(20) DEFAULT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(35) DEFAULT NULL,
    last_name VARCHAR(30) DEFAULT NULL,
    phone_number VARCHAR (45) NOT NULL,
    birth_date DATE,
    profile_image TEXT, /* We are using base-64 for store images */
    isNutritionist BOOLEAN DEFAULT false,
    isPatient BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);



