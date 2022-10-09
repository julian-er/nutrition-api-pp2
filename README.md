# NUTRITION APP API

Table of contents

-   [1. Description](#1-description)
-   [2. Structure](#2-structure)

# 1. Description

This API was made with the purpose of making the whole "Nutrition APP" application work for nutritionists.
That will allow them to carry out personalized diets avoiding the use of foods that are harmful to the patient's health and they will also be able to base them on their preferences.
Professionals of nutrition can manage CRUD for food, days, patients, dishes, notes, and helpful more things for their work like measuring history for patients and much more.

# 2. Structure

The folder structure was created with the best way to find the code in mind. It has a database folder where you can see SQL files to create the database and some test inserts (warning: both "unit_of_measure" and "part_of_day" inserts are fixed and must always be done in your database for this to work correctly)
<pre>
:file_folder: node_modules
:open_file_folder: database
│ :page_facing_up:── creation_scripts.sql
│ :page_facing_up:── table_inserts.sql
:open_file_folder: src
│ :open_file_folder:controllers
│ ├──:open_file_folder: food
│ │├──:page_facing_up: food_category.js
│ │└──:page_facing_up: food.js
│ ├──:open_file_folder: health
│ │├──:page_facing_up: allergies.js
│ │└──:page_facing_up: pathologies.js
│ ├──:open_file_folder: users
│ │├──:page_facing_up: nutritionists.js
│ │├──:page_facing_up: patients.js
│ │├──:page_facing_up: user_notes.js
│ │└──:page_facing_up: users.js
│ ├──:page_facing_up: base-sql.js
│ ├──:page_facing_up: day.js
│ ├──:page_facing_up: dish.js
│ ├──:page_facing_up: index.js
│ └──:page_facing_up: login.js
│ :open_file_folder:helpers
│ ├──:page_facing_up: index.js
│ :open_file_folder:routes
│ ├──:open_file_folder: food
│ │├──:page_facing_up: food_category.js
│ │└──:page_facing_up: food.js
│ ├──:open_file_folder: health
│ │├──:page_facing_up: allergies.js
│ │└──:page_facing_up: pathologies.js
│ ├──:open_file_folder: users
│ │├──:page_facing_up: nutritionists.js
│ │├──:page_facing_up: patients.js
│ │└──:page_facing_up: users.js
│ ├──:page_facing_up: day.js
│ ├──:page_facing_up: dish.js
│ ├──:page_facing_up: index.js
│ ├──:page_facing_up: login.js
│ └──:page_facing_up: notes.js
│ :open_file_folder:services
│ └──:page_facing_up: jwt-services.js
│ ├── :page_facing_up: database.js
│ └── :page_facing_up: server.js
:page_facing_up: .editorconfig
:page_facing_up: .env-cmdrc
:page_facing_up: .gitignore
:page_facing_up: .prettierignore
:page_facing_up: .prettierrc
:page_facing_up: Educate[...].postman_collection.json
:page_facing_up: package-lock.json
:page_facing_up: package.json
:page_facing_up: README
</pre>
The controller folder is where all the logic is managed for all routes, and then the routes folder is where these logics are called to a certain URL making your endpoints.