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

CREATE TABLE IF NOT EXISTS daily_diets (
    id INT NOT NULL AUTO_INCREMENT,
    dish1_id INT NOT NULL,
    dish2_id INT NOT NULL,
    dish3_id INT NOT NULL,
    dish4_id INT NOT NULL,
    FOREIGN KEY (dish1_id) REFERENCES  dishes(id),
    FOREIGN KEY (dish2_id) REFERENCES  dishes(id),
    FOREIGN KEY (dish3_id) REFERENCES  dishes(id),
    FOREIGN KEY (dish4_id) REFERENCES  dishes(id),
    PRIMARY key (id)
)



CREATE TABLE IF NOT EXISTS allergy_excludes_food(
    allergy_id INT NOT NULL,
    food_id INT NOT NULL,
    description VARCHAR(255)DEFAULT NULL,
    FOREIGN KEY (food_id) REFERENCES foods(id),
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
    patology_name VARCHAR(255) NOT NULL,
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
    user2_id INT NOT NULL ,
    title VARCHAR(30) NOT NULL,
    note_date DATE NOT NULL,
    content TEXT,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

