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
├── node_modules
├── database
│   ├── creation_scripts.sql
│   └── table_inserts.sql
├── src
│   ├── controllers
│   │   ├── food
│   │   │   ├── food_category.js
│   │   │   └── food.js
│   │   ├── health
│   │   │   ├── allergies.js
│   │   │   └── pathologies.js
│   │   ├── users
│   │   │   ├── nutritionists.js
│   │   │   ├── patients.js
│   │   │   ├── user_notes.js
│   │   │   └── users.js
│   │   ├── base-sql.js
│   │   ├── day.js
│   │   ├── dish.js
│   │   ├── index.js
│   │   └── login.js
│   ├── helpers
│   │   └── index.js
│   ├── routes
│   │   ├── food
│   │   │   ├── food_category.js
│   │   │   └── food.js
│   │   ├── health
│   │   │   ├── allergies.js
│   │   │   └── pathologies.js
│   │   ├── users
│   │   │   ├── nutritionists.js
│   │   │   ├── patients.js
│   │   │   └── users.js
│   │   ├── day.js
│   │   ├── dish.js
│   │   ├── index.js
│   │   ├── login.js
│   │   └── notes.js
│   ├── services
│   │   └── jwt-services.js
│   ├──  database.js
│   └──  server.js
├── .editorconfig
├── .env-cmdrc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── Educate[...].postman_collection.json
├── package-lock.json
├── package.json
└── README
</pre>
The controller folder is where all the logic is managed for all routes, and then the routes folder is where these logics are called to a certain URL making your endpoints.