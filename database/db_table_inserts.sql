use db_nutrition;

INSERT INTO users
  (user_name, password, email, first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient)
VALUES
  ("juan123", 12456, "juan@gmail.com", "Juan", "Gomez", 34123123, 1/5/1980, "profile_image", FALSE, TRUE),
  ("patient", "pass123", "patient@gmail.com", "Laura", "asd", 54651621, 1/12/1999, "profile_image", TRUE, FALSE),
  ("tes54163", "dsurquiza", "test@gmail.com", "test", "test", 95416515, 25/7/1995, "profile_image", FALSE, TRUE),
  ("nutritionis214", "nutrition56" , "nutrition@gmail.com", "Juan", "Gomez", 651651, 16/11/1970, "profile_image", FALSE, TRUE);


INSERT INTO foods
  (food_name, description, photo, food_unit)
VALUES
  ("bread", "Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking. Throughout recorded history and around the world, it has been an important part of many cultures' diet. It is one of the oldest human-made foods, having been of significance since the dawn of agriculture, and plays an essential role in both religious rituals and secular culture.", "photo", "g" ),
  ("watermelon", "watermelon, (Citrullus lanatus), succulent fruit and vinelike plant of the gourd family (Cucurbitaceae), native to tropical Africa and cultivated around the world.", "photo", "g" ),
  ("meat","Meat is mainly composed of water, protein, and fat. It is edible raw, but is normally eaten after it has been cooked and seasoned or processed in a variety of ways. Unprocessed meat will spoil or rot within hours or days as a result of infection with, and decomposition by, bacteria and fungi.", "photo", "g");
  
  
INSERT INTO diets
	(diet_name, description)
VALUES
    ("vegan", "Veganism is the practice of abstaining from the use of animal products, particularly in diet, and an associated philosophy that rejects the commodity status of animals. An individual who follows the diet or philosophy is known as a vegan. Distinctions may be made between several categories of veganism. Dietary vegans, also known as strict vegetarians, refrain from consuming meat, eggs, dairy products, and any other animal-derived substances.[d] An ethical vegan is someone who not only follows a plant-based diet but extends the philosophy into other areas of their lives, opposes the use of animals for any purpose,and tries to avoid any cruelty and exploitation of all animals including humans"),
    ("ketogenic diet", "The ketogenic diet is a high-fat, adequate-protein, low-carbohydrate mainstream dietary therapy that in medicine is used mainly to treat hard-to-control (refractory) epilepsy in children. The diet forces the body to burn fats rather than carbohydrates.");
    
INSERT INTO diet_excludes_food (diet_id, food_id, description) VALUES(1,3, "meat is a animal product");


INSERT INTO units (unit_name, description) VALUES ("g", "gram"), ("Kg", "kilogram"), ("ml", "mililiter"), ("L", "litre");

INSERT INTO allergies (allergy_name, description) VALUES ("celiac disease", "test");

INSERT INTO pathologies (pathology_name, description) VALUES ("anemia","Anemia is a condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues. Having anemia, also referred to as low hemoglobin, can make you feel tired and weak."),("high cholesterol","High cholesterol, on its own, doesn't usually cause any symptoms but increases your risk of serious health conditions.");