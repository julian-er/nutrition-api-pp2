CREATE DATABASE IF NOT EXISTS db_nutrition;
USE db_nutrition;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    phone_number VARCHAR (45) DEFAULT NULL,
    birth_date DATE,
    profile_image TEXT DEFAULT NULL, /* We are using base-64 for store images */
    isNutritionist BOOLEAN DEFAULT false,
    isPatient BOOLEAN DEFAULT false,
    PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS patient_measures(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    heigth_value VARCHAR (45) NOT NULL,
    weigth_value VARCHAR (45) NOT NULL,
    weigth_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS foods(
    id INT NOT NULL AUTO_INCREMENT,
    food_name VARCHAR(30) NOT NULL,
    description TEXT  DEFAULT NULL,
    photo TEXT DEFAULT NULL, /* We are using base-64 for store images */
    food_unit VARCHAR(30), /* (grams, mililiters, etc) */
	PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS units (
    id INT NOT NULL AUTO_INCREMENT,
    unit_name VARCHAR(30) NOT NULL,
    description TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS food_unit(
    id INT NOT NULL AUTO_INCREMENT,
    food_id INT NOT NULL,
    unit_id INT NOT NULL,
    PRIMARY KEY(ID),
    FOREIGN KEY(food_id) REFERENCES foods(id),
    FOREIGN KEY(unit_id) REFERENCES units(id)
);

CREATE TABLE IF NOT EXISTS categories(
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(30) NOT NULL,
    description TEXT DEFAULT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS food_category(
    food_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (food_id) REFERENCES foods(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS dishes(
    id INT NOT NULL AUTO_INCREMENT,
    dish_name VARCHAR(120),
    dish_size INT,  
    units_total VARCHAR(30),
    description TEXT,
    food1_id INT DEFAULT NULL,
    food2_id INT DEFAULT NULL,
    food3_id INT DEFAULT NULL,
    food4_id INT DEFAULT NULL,
    food5_id INT DEFAULT NULL,
    food6_id INT DEFAULT NULL,
    food7_id INT DEFAULT NULL,
    food8_id INT DEFAULT NULL,
    FOREIGN KEY (food1_id) REFERENCES foods(id),
    FOREIGN KEY (food2_id) REFERENCES foods(id),
    FOREIGN KEY (food3_id) REFERENCES foods(id),
    FOREIGN KEY (food4_id) REFERENCES foods(id),
    FOREIGN KEY (food5_id) REFERENCES foods(id),
    FOREIGN KEY (food6_id) REFERENCES foods(id),
    FOREIGN KEY (food7_id) REFERENCES foods(id),
    FOREIGN KEY (food8_id) REFERENCES foods(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS daily_diets(
    id INT NOT NULL AUTO_INCREMENT,
    dish1_id INT NOT NULL,
    dish2_id INT NOT NULL,
    dish3_id INT NOT NULL,
    dish4_id INT NOT NULL,
    FOREIGN KEY (dish1_id) REFERENCES dishes(id),
    FOREIGN KEY (dish2_id) REFERENCES dishes(id),
    FOREIGN KEY (dish3_id) REFERENCES dishes(id),
    FOREIGN KEY (dish4_id) REFERENCES dishes(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_daily_diet(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    daily_diet_id INT NOT NULL,
    day VARCHAR(10) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (daily_diet_id) REFERENCES daily_diets(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS allergies(
    id INT NOT NULL AUTO_INCREMENT,
    allergy_name VARCHAR(60) NOT NULL,
    description TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS allergy_excludes_food(
    allergy_id INT NOT NULL,
    food_id INT NOT NULL,
    description TEXT DEFAULT NULL,
    FOREIGN KEY (food_id) REFERENCES foods(id),
    FOREIGN KEY (allergy_id) REFERENCES allergies(id)
);

CREATE TABLE IF NOT EXISTS user_allergy(
    allergy_id INT NOT NULL,
    user_id INT NOT NULL,
    description TEXT DEFAULT NULL,
    FOREIGN KEY (allergy_id) REFERENCES allergies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS pathologies(
    id INT NOT NULL AUTO_INCREMENT,
    pathology_name VARCHAR(200) NOT NULL,
    description TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_pathology(
    pathology_id INT NOT NULL,
    user_id INT NOT NULL,
    description TEXT DEFAULT NULL,
    FOREIGN KEY (pathology_id) REFERENCES pathologies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS diets(
    id INT NOT NULL AUTO_INCREMENT,
    diet_name VARCHAR(60) NOT NULL,
    description TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_diet(
    user_id INT NOT NULL,
    diet_id INT NOT NULL,
    description TEXT DEFAULT NULL,
    FOREIGN KEY (diet_id) REFERENCES diets(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS diet_excludes_food(
    diet_id INT NOT NULL,
    food_id INT NOT NULL,
    description TEXT DEFAULT NULL,
    FOREIGN KEY (food_id) REFERENCES foods(id),
    FOREIGN KEY (diet_id) REFERENCES diets(id)
);

CREATE TABlE IF NOT EXISTS user_notes(
    id INT NOT NULL AUTO_INCREMENT,
    note_name VARCHAR (45) NOT NULL,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL /*nutritionist id*/,
    note_date DATE NOT NULL,
    content TEXT,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id),
    PRIMARY KEY (id)
);
