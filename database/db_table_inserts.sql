use db_nutrition;

-- the password default is bcrypt that represent "someTestPassword" string
INSERT INTO user
  (user_name, password, email, first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient)
VALUES
  ("patient1", "$2b$10$BWY8FE3H5LRHSFolY3x5gOd9RXNI.BOJufDUAscgRRfZ2AEeEK7wy", "patient@gmail.com", "Juan", "Gomez", 34123123, "1980-05-02", "data:image/jpeg;base64,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HHJejW7sItxZ0eG8eYRAEIB4I0YqrIlZ21YEEAh4LwaBwF3vr4YpabPocIpV5Ih9e3JsRklwlPHgGLA9zQ0hHMB3n2o2dGKJ893hQHWGoNCyOQcWCcQB+y3KTGbJCknU0JXEahw/REfVNfCPdEXB2Hk0gSDgw58VEeQ+rRp4lVeRd2hCYYk8GjRENB6/r//aAAwDAQACAAMAAAAQ888888888888888888888888888888888888888888888888888ksc088888888880888M888888888k8888sU88888888488kY8c88888888k8k88c888888888sg888o88888888888M8s888888888840wQQw888888884M88c88o08888844Q888888c88s88sIA08888oE88888goAU8884AE088//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QYf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QYf/EACsQAQABAgMIAwACAwEAAAAAAAERACExQVEgMEBhcYGRoRCxwdHxUHDh8P/aAAgBAQABPxD/AGA3EcTdqce1Fjtrv0CjWb/4LtDkrjDHiXqmDcRKcghPakTGzo8OVLRLflp+WBnOFJD2q6BgORU1NT8A7NmWXNudGTpRcLQYZwMk/rhQlozdS9100uRoS6Us47dvdZ9uXyYj2waFIbPD95ZcJC6uziBh1WDvUwxtDQOQQHTcvPSWRlk+vLhGiqz8iXtR3LuDrhMPk0xmkyeCCnNco5pejdIm2tqkVM25JPY8EtqdayD9htTU/JjUaWXwif3g0U6f1svyfLXSCOCQxNOhmx3D+7E7J8KsJ4OB+cFlSMIKPYvR53QxdwL06gQnEu+DF0PEJWQTpB2VkU7hCxA+CrndgdaICAAwDTgzz1pILo8vip9Jc6UiKIiMM5O3LVhLYNcIPelQoMGEOmaDI/nhRisW3UpdVLdw0xZBWzuflNubP10SwTup7iU+qJmsJb3BQElef9B81hz/AHLsff8AlbmNFAHVaxKVKm9PdIjS4X7WpWB5isQN1+yCm0pyDuv1ULzGAo64vXDES2TSc1ocJyRJ1Y71Y6U60vA6Bs8UYW2Xq1I4OiXox1lLY5F/M0bdBKgPoeZ44MgkTKJfzUvbV+kuDPkZvNfYn4dhtayUK1EwaHNmFF9BHL+2tM2CAMiOCPALSl5EOo0Gb0DGnTFKWAyDIZBvW+Sjytkur+RaaEQUIkiMjvsMV5isDUVgOtXn1BbDB6e2XfzCnL7ndeqY8kmRtjGRtDGU1jkpFtDfsGOq8AL06lwZGhfGickOmZyTeRxSxOSPlHoNOhJjyMr52HdnwwwkpsHJ7DsbyLHQXI/6t+fLkjrSppMxfTQE+904Wxp3XDlwp9to7g2DKkmgq5foFOO594pjJaXu2nbNkpi3FBpJn6rF2f/Z", FALSE, TRUE),
  ("nutritionist1", "$2b$10$BWY8FE3H5LRHSFolY3x5gOd9RXNI.BOJufDUAscgRRfZ2AEeEK7wy", "nutritionist@gmail.com", "Laura", "asd", 54651621, "1999-12-1", "data:image/jpeg;base64,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HHJejW7sItxZ0eG8eYRAEIB4I0YqrIlZ21YEEAh4LwaBwF3vr4YpabPocIpV5Ih9e3JsRklwlPHgGLA9zQ0hHMB3n2o2dGKJ893hQHWGoNCyOQcWCcQB+y3KTGbJCknU0JXEahw/REfVNfCPdEXB2Hk0gSDgw58VEeQ+rRp4lVeRd2hCYYk8GjRENB6/r//aAAwDAQACAAMAAAAQ888888888888888888888888888888888888888888888888888ksc088888888880888M888888888k8888sU88888888488kY8c88888888k8k88c888888888sg888o88888888888M8s888888888840wQQw888888884M88c88o08888844Q888888c88s88sIA08888oE88888goAU8884AE088//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QYf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QYf/EACsQAQABAgMIAwACAwEAAAAAAAERACExQVEgMEBhcYGRoRCxwdHxUHDh8P/aAAgBAQABPxD/AGA3EcTdqce1Fjtrv0CjWb/4LtDkrjDHiXqmDcRKcghPakTGzo8OVLRLflp+WBnOFJD2q6BgORU1NT8A7NmWXNudGTpRcLQYZwMk/rhQlozdS9100uRoS6Us47dvdZ9uXyYj2waFIbPD95ZcJC6uziBh1WDvUwxtDQOQQHTcvPSWRlk+vLhGiqz8iXtR3LuDrhMPk0xmkyeCCnNco5pejdIm2tqkVM25JPY8EtqdayD9htTU/JjUaWXwif3g0U6f1svyfLXSCOCQxNOhmx3D+7E7J8KsJ4OB+cFlSMIKPYvR53QxdwL06gQnEu+DF0PEJWQTpB2VkU7hCxA+CrndgdaICAAwDTgzz1pILo8vip9Jc6UiKIiMM5O3LVhLYNcIPelQoMGEOmaDI/nhRisW3UpdVLdw0xZBWzuflNubP10SwTup7iU+qJmsJb3BQElef9B81hz/AHLsff8AlbmNFAHVaxKVKm9PdIjS4X7WpWB5isQN1+yCm0pyDuv1ULzGAo64vXDES2TSc1ocJyRJ1Y71Y6U60vA6Bs8UYW2Xq1I4OiXox1lLY5F/M0bdBKgPoeZ44MgkTKJfzUvbV+kuDPkZvNfYn4dhtayUK1EwaHNmFF9BHL+2tM2CAMiOCPALSl5EOo0Gb0DGnTFKWAyDIZBvW+Sjytkur+RaaEQUIkiMjvsMV5isDUVgOtXn1BbDB6e2XfzCnL7ndeqY8kmRtjGRtDGU1jkpFtDfsGOq8AL06lwZGhfGickOmZyTeRxSxOSPlHoNOhJjyMr52HdnwwwkpsHJ7DsbyLHQXI/6t+fLkjrSppMxfTQE+904Wxp3XDlwp9to7g2DKkmgq5foFOO594pjJaXu2nbNkpi3FBpJn6rF2f/Z", TRUE, FALSE),
  ("tes1", "$2b$10$BWY8FE3H5LRHSFolY3x5gOd9RXNI.BOJufDUAscgRRfZ2AEeEK7wy", "test@gmail.com", "test", "test", 95416515, "1995-07-25", "data:image/jpeg;base64,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HHJejW7sItxZ0eG8eYRAEIB4I0YqrIlZ21YEEAh4LwaBwF3vr4YpabPocIpV5Ih9e3JsRklwlPHgGLA9zQ0hHMB3n2o2dGKJ893hQHWGoNCyOQcWCcQB+y3KTGbJCknU0JXEahw/REfVNfCPdEXB2Hk0gSDgw58VEeQ+rRp4lVeRd2hCYYk8GjRENB6/r//aAAwDAQACAAMAAAAQ888888888888888888888888888888888888888888888888888ksc088888888880888M888888888k8888sU88888888488kY8c88888888k8k88c888888888sg888o88888888888M8s888888888840wQQw888888884M88c88o08888844Q888888c88s88sIA08888oE88888goAU8884AE088//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QYf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QYf/EACsQAQABAgMIAwACAwEAAAAAAAERACExQVEgMEBhcYGRoRCxwdHxUHDh8P/aAAgBAQABPxD/AGA3EcTdqce1Fjtrv0CjWb/4LtDkrjDHiXqmDcRKcghPakTGzo8OVLRLflp+WBnOFJD2q6BgORU1NT8A7NmWXNudGTpRcLQYZwMk/rhQlozdS9100uRoS6Us47dvdZ9uXyYj2waFIbPD95ZcJC6uziBh1WDvUwxtDQOQQHTcvPSWRlk+vLhGiqz8iXtR3LuDrhMPk0xmkyeCCnNco5pejdIm2tqkVM25JPY8EtqdayD9htTU/JjUaWXwif3g0U6f1svyfLXSCOCQxNOhmx3D+7E7J8KsJ4OB+cFlSMIKPYvR53QxdwL06gQnEu+DF0PEJWQTpB2VkU7hCxA+CrndgdaICAAwDTgzz1pILo8vip9Jc6UiKIiMM5O3LVhLYNcIPelQoMGEOmaDI/nhRisW3UpdVLdw0xZBWzuflNubP10SwTup7iU+qJmsJb3BQElef9B81hz/AHLsff8AlbmNFAHVaxKVKm9PdIjS4X7WpWB5isQN1+yCm0pyDuv1ULzGAo64vXDES2TSc1ocJyRJ1Y71Y6U60vA6Bs8UYW2Xq1I4OiXox1lLY5F/M0bdBKgPoeZ44MgkTKJfzUvbV+kuDPkZvNfYn4dhtayUK1EwaHNmFF9BHL+2tM2CAMiOCPALSl5EOo0Gb0DGnTFKWAyDIZBvW+Sjytkur+RaaEQUIkiMjvsMV5isDUVgOtXn1BbDB6e2XfzCnL7ndeqY8kmRtjGRtDGU1jkpFtDfsGOq8AL06lwZGhfGickOmZyTeRxSxOSPlHoNOhJjyMr52HdnwwwkpsHJ7DsbyLHQXI/6t+fLkjrSppMxfTQE+904Wxp3XDlwp9to7g2DKkmgq5foFOO594pjJaXu2nbNkpi3FBpJn6rF2f/Z", FALSE, TRUE),
  ("nutritionis2", "$2b$10$BWY8FE3H5LRHSFolY3x5gOd9RXNI.BOJufDUAscgRRfZ2AEeEK7wy" , "nutrition@gmail.com", "Juan", "Gomez", 651651, "1970-11-16", "data:image/jpeg;base64,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HHJejW7sItxZ0eG8eYRAEIB4I0YqrIlZ21YEEAh4LwaBwF3vr4YpabPocIpV5Ih9e3JsRklwlPHgGLA9zQ0hHMB3n2o2dGKJ893hQHWGoNCyOQcWCcQB+y3KTGbJCknU0JXEahw/REfVNfCPdEXB2Hk0gSDgw58VEeQ+rRp4lVeRd2hCYYk8GjRENB6/r//aAAwDAQACAAMAAAAQ888888888888888888888888888888888888888888888888888ksc088888888880888M888888888k8888sU88888888488kY8c88888888k8k88c888888888sg888o88888888888M8s888888888840wQQw888888884M88c88o08888844Q888888c88s88sIA08888oE88888goAU8884AE088//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QYf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QYf/EACsQAQABAgMIAwACAwEAAAAAAAERACExQVEgMEBhcYGRoRCxwdHxUHDh8P/aAAgBAQABPxD/AGA3EcTdqce1Fjtrv0CjWb/4LtDkrjDHiXqmDcRKcghPakTGzo8OVLRLflp+WBnOFJD2q6BgORU1NT8A7NmWXNudGTpRcLQYZwMk/rhQlozdS9100uRoS6Us47dvdZ9uXyYj2waFIbPD95ZcJC6uziBh1WDvUwxtDQOQQHTcvPSWRlk+vLhGiqz8iXtR3LuDrhMPk0xmkyeCCnNco5pejdIm2tqkVM25JPY8EtqdayD9htTU/JjUaWXwif3g0U6f1svyfLXSCOCQxNOhmx3D+7E7J8KsJ4OB+cFlSMIKPYvR53QxdwL06gQnEu+DF0PEJWQTpB2VkU7hCxA+CrndgdaICAAwDTgzz1pILo8vip9Jc6UiKIiMM5O3LVhLYNcIPelQoMGEOmaDI/nhRisW3UpdVLdw0xZBWzuflNubP10SwTup7iU+qJmsJb3BQElef9B81hz/AHLsff8AlbmNFAHVaxKVKm9PdIjS4X7WpWB5isQN1+yCm0pyDuv1ULzGAo64vXDES2TSc1ocJyRJ1Y71Y6U60vA6Bs8UYW2Xq1I4OiXox1lLY5F/M0bdBKgPoeZ44MgkTKJfzUvbV+kuDPkZvNfYn4dhtayUK1EwaHNmFF9BHL+2tM2CAMiOCPALSl5EOo0Gb0DGnTFKWAyDIZBvW+Sjytkur+RaaEQUIkiMjvsMV5isDUVgOtXn1BbDB6e2XfzCnL7ndeqY8kmRtjGRtDGU1jkpFtDfsGOq8AL06lwZGhfGickOmZyTeRxSxOSPlHoNOhJjyMr52HdnwwwkpsHJ7DsbyLHQXI/6t+fLkjrSppMxfTQE+904Wxp3XDlwp9to7g2DKkmgq5foFOO594pjJaXu2nbNkpi3FBpJn6rF2f/Z", TRUE, TRUE);

INSERT INTO user_measures_history 
  (user_id, date, height, weight)
VALUES
  (1, "2022-10-1", "1,80", "85"),
  (1, "2022-10-8", "1,80", "78"),
  (2, "2022-10-8", "1,70", "90"),
  (3, "2022-09-25", "1,80", "67"),
  (3, "2022-10-8", "1,80", "73"),
  (4, "2022-10-8", "1,80", "78");

INSERT INTO allergy 
  (name, description) 
VALUES 
  ("Celiaquia", "Reacción inmunológica ante la ingesta de gluten, una proteína presente en el trigo, la cebada y el centeno."),
  ("Intolerancia a la lactosa","Incapacidad de digerir por completo el azúcar (lactosa) de los lácteos.");

INSERT INTO pathology
  (name, description)
VALUES
  ("Diabetes", "Un grupo de enfermedades que tiene como resultado un exceso de azúcar en la sangre (glucosa sanguínea elevada)" ),
  ("Diabetes tipo 2", "En la diabetes tipo 2, el cuerpo de la persona no produce suficiente insulina o es resistente a la insulina. Los síntomas incluyen sed, micción frecuente, hambre, cansancio y visión borrosa. En algunos casos, no hay síntomas. Los tratamientos incluyen dieta, ejercicios, insulinoterapia y medicación." );

INSERT INTO food
  (name, description, image)
VALUES
  ("Carne","La carne es el tejido animal, principalmente muscular, que se consume como alimento.​Se trata de una clasificación coloquial y comercial que solo se aplica a animales terrestres", "image");
  
INSERT INTO food_category
	(name, description)
VALUES
	("vegetales", "Las verduras son hortalizas cuyo color predominante es el verde.​ Sin embargo, el uso popular suele extender su significado a otras partes comestibles de las plantas");

INSERT INTO dish
  (date, title, day_part_id)
VALUES
  ("2022-10-08", "Merienda pre entreno", 5),
  ("2022-10-08", "Merienda sin entreno", 5),
  ("2022-10-08", "Desayuno liviano", 1),
  ("2022-10-08", "Media mañana", 2);

INSERT INTO day
  (date, title, description, user_id)
VALUES
  ("2022-10-08", "Lunes", "Este dia puede reemplazarse con el del jueves o invertirse con el del martes" , 1),
  ("2022-10-09", "Martes", "",  1),
  ("2022-10-08", "Miercoles", "Receta de la tortilla de avena rapida en http://ejemplo.com/tortilla", 1),
  ("2022-10-08", "Lunes", "Unico dia que no puede variar en alimentos",2);

-- CREATE ALLWAYS !
INSERT INTO measurement_unit 
	(unit_name, description)
VALUES 
	  ("kg", "Kilogramo"),
    ("g", "gramo"),
    ("mg", "miligramo"),
    ("l", "litro"),
    ("ml", "mililitro"),
    ("cm³", "centímetro cúbico");

INSERT INTO day_part 
	(name)
VALUES 
	  ("Mañana"),
    ("Media Mañana"),
    ("Mediodia"),
    ("Media Tarde"),
    ("Tarde"),
    ("Noche");