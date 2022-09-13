/* The date format is the American one YYYY-MM-DD */
INSERT INTO
    users (user_name, password, email, first_name, last_name, phone_number, birth_date , profile_image, isNutritionist, isPatient )
VALUES
    ('userTest','someTestPassword','sometestemail@gmail.com', 'Nutri', 'Tionist', '6578347892', NULL,  NULL, true, false),
    ('userTest2','someTestPassword','sometestemail@gmail.com', 'Pa', 'Tient', '6578347892', '1999-05-10',  NULL, false, true),
    ('userTest3','someTestPassword','sometestemail@gmail.com', 'Nutritionist', 'Patient', '6578347892', '1990-10-29', NULL, true, true),
    ('userTest4','someTestPassword','sometestemail@gmail.com', 'Pa', 'Tient2', '6578347892', NULL, 'SOME BASE-64 IMG', false, true),
    ('userTest5','someTestPassword','sometestemail@gmail.com', 'Nutri', 'Tionist2', '6578347892', NULL, NULL, true, false),
    ('userTest6','someTestPassword','sometestemail@gmail.com', 'Pa', 'Tient3', '6578347892', '2005-05-10', NULL, false, true);