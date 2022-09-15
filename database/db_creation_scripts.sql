CREATE DATABASE IF NOT EXISTS db_nutrition;
USE db_nutrition;

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

CREATE TABLE IF NOT EXISTS food(
    id INT NOT NULL AUTO_INCREMENT,
    food_name VARCHAR(30) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    photo TEXT DEFAULT NULL, /* We are using base-64 for store images */
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categories(
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(30) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS food_category(
    food_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (food_id) REFERENCES food(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS meal(
    id INT NOT NULL AUTO_INCREMENT,
    food1_id INT NOT NULL,
    food2_id INT NOT NULL,
    food3_id INT NOT NULL,
    food4_id INT NOT NULL,
    FOREIGN KEY (food1_id) REFERENCES food(id),
    FOREIGN KEY (food2_id) REFERENCES food(id),
    FOREIGN KEY (food3_id) REFERENCES food(id),
    FOREIGN KEY (food4_id) REFERENCES food(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS daily_diet(
    id INT NOT NULL AUTO_INCREMENT,
    meal1_id INT NOT NULL,
    meal2_id INT NOT NULL,
    meal3_id INT NOT NULL,
    meal4_id INT NOT NULL,
    FOREIGN KEY (meal1_id) REFERENCES food(id),
    FOREIGN KEY (meal2_id) REFERENCES food(id),
    FOREIGN KEY (meal3_id) REFERENCES food(id),
    FOREIGN KEY (meal4_id) REFERENCES food(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_daily_diet(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    daily_diet_id INT NOT NULL,
    day VARCHAR(10) DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS allergies(
    id INT NOT NULL AUTO_INCREMENT,
    allergy_name VARCHAR(60) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS allergy_excludes_food(
    allergy_id INT NOT NULL,
    food_id INT NOT NULL,
    description VARCHAR(255)DEFAULT NULL,
    FOREIGN KEY (food_id) REFERENCES food(id),
    FOREIGN KEY (allergy_id) REFERENCES allergies(id)
);

CREATE TABLE IF NOT EXISTS user_allergy(
    allergy_id INT NOT NULL,
    user_id INT NOT NULL,
    description VARCHAR(255)DEFAULT NULL,
    FOREIGN KEY (allergy_id) REFERENCES allergies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS patologies(
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_patology(
    patology_id INT NOT NULL,
    user_id INT NOT NULL,
    description VARCHAR(255)DEFAULT NULL,
    FOREIGN KEY (patology_id) REFERENCES patologies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS diets(
    id INT NOT NULL AUTO_INCREMENT,
    diet_name VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_diet(
    user_id INT NOT NULL,
    diet_id INT NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (diet_id) REFERENCES diets(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABlE IF NOT EXISTS user_notes(
    id INT NOT NULL AUTO_INCREMENT,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL /*nutritionist id*/,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id),
    PRIMARY KEY (id)
);
