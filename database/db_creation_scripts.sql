CREATE DATABASE IF NOT EXISTS db_nutrition;
USE db_nutrition;

/* One user for pacients and nutritionist because an user can be both*/
CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL,
    password CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL, /* max lenght for emails is 254 */
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    phone_number VARCHAR (50) DEFAULT NULL,
    birth_date DATE,
    profile_image TEXT DEFAULT NULL, /* We are using base-64 for store images */
    isNutritionist BOOLEAN DEFAULT false,
    isPatient BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);

/* History of measures for the patient*/
CREATE TABLE IF NOT EXISTS user_measures_history (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
	date DATE NOT NULL,
    height VARCHAR (45), /* this can be null beacuse users allways change their weight but not the height */
    weight VARCHAR (45) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(id),
	PRIMARY KEY (id)
);

/* User can have allergies and food too (for exclude this food on specific patiten diet) */
CREATE TABLE IF NOT EXISTS allergy (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

/* User can have pathologies and food too (for exclude this food on specific patiten diet) */
CREATE TABLE IF NOT EXISTS pathology (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

/* User, Dish and Daily diet can have notes*/
CREATE TABlE IF NOT EXISTS note (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (45) NOT NULL,
    date DATE NOT NULL,
    content TEXT,
    PRIMARY KEY (id)
);

/* Unit can be grams, mililiters, etc and one food can have more than one*/
CREATE TABLE IF NOT EXISTS food (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description TEXT  DEFAULT NULL,
    image TEXT DEFAULT NULL, /* We are using base-64 for store images */
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS food_category (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

/* All foods need to have unit of measurement  */
CREATE TABLE IF NOT EXISTS measurement_unit (
    id INT NOT NULL AUTO_INCREMENT,
    unit_name VARCHAR(30) NOT NULL,
    description TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS day_part (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

/* One dish can have more than 1 food (N food) but one dish have only 8 portions */
CREATE TABLE IF NOT EXISTS dish (
    id INT NOT NULL AUTO_INCREMENT,
	date DATE NOT NULL,  
    title VARCHAR(150),
    day_part_id INT NOT NULL,
	FOREIGN KEY (day_part_id) REFERENCES day_part(id),
    PRIMARY KEY (id)
);

/* One daily diet can have more than 1 dish (N dishes)*/
CREATE TABLE IF NOT EXISTS day (
    id INT NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    PRIMARY KEY (id)
);

/* Middle tables */

/* relates to user */

CREATE TABLE IF NOT EXISTS user_alergies (
	id INT NOT NULL AUTO_INCREMENT,
	allergy_id INT NOT NULL,
	user_id INT NOT NULL,
    FOREIGN KEY (allergy_id) REFERENCES allergy(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_pathologies (
	id INT NOT NULL AUTO_INCREMENT,
	pathology_id INT NOT NULL,
	user_id INT NOT NULL,
    FOREIGN KEY (pathology_id) REFERENCES pathology(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_note (
	id INT NOT NULL AUTO_INCREMENT,
	note_id INT NOT NULL,
	user_id INT NOT NULL,
    FOREIGN KEY (note_id) REFERENCES note(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS nutritionist_patients_relation (
	id INT NOT NULL AUTO_INCREMENT,
	nutritionist_id INT NOT NULL,
	patient_id INT NOT NULL,
    FOREIGN KEY (nutritionist_id) REFERENCES user(id),
    FOREIGN KEY (patient_id) REFERENCES user(id),
    PRIMARY KEY (id)
);

/* relates to food */
CREATE TABLE IF NOT EXISTS food_alergies (
	id INT NOT NULL AUTO_INCREMENT,
	allergy_id INT NOT NULL,
	food_id INT NOT NULL,
    FOREIGN KEY (allergy_id) REFERENCES allergy(id),
    FOREIGN KEY (food_id) REFERENCES food(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS food_pathologies (
	id INT NOT NULL AUTO_INCREMENT,
	pathology_id INT NOT NULL,
	food_id INT NOT NULL,
    FOREIGN KEY (pathology_id) REFERENCES pathology(id),
    FOREIGN KEY (food_id) REFERENCES food(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS food_categories (
	id INT NOT NULL AUTO_INCREMENT,
	category_id INT NOT NULL,
	food_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES food_category(id),
    FOREIGN KEY (food_id) REFERENCES food(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS food_measures (
	id INT NOT NULL AUTO_INCREMENT,
	measurement_id INT NOT NULL,
	food_id INT NOT NULL,
    FOREIGN KEY (measurement_id) REFERENCES measurement_unit(id),
    FOREIGN KEY (food_id) REFERENCES food(id),
    PRIMARY KEY (id)
 );

 /* relates to dish */
 CREATE TABLE IF NOT EXISTS dish_food (
	id INT NOT NULL AUTO_INCREMENT,
    food_measure INT NOT NULL,
    food_space INT NOT NULL,
    meassure_id INT NOT NULL,
    food_id INT NOT NULL,
    dish_id INT NOT NULL,
	FOREIGN KEY (dish_id) REFERENCES dish(id),
    FOREIGN KEY (food_id) REFERENCES food(id),
    FOREIGN KEY (meassure_id) REFERENCES food_measures(id),
    PRIMARY KEY (id)
 );
 
 /* realates to daily dishes or diets */
 CREATE TABLE IF NOT EXISTS daily_dishes (
 	id INT NOT NULL AUTO_INCREMENT,
    dish_id INT NOT NULL,
    day_id INT NOT NULL,
	FOREIGN KEY (dish_id) REFERENCES dish(id),
    FOREIGN KEY (day_id) REFERENCES day(id),
    PRIMARY KEY (id)
 );
 
