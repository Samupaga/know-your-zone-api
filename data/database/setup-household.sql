DROP TABLE IF EXISTS household_data; 

CREATE TABLE household_data (
    id INT GENERATED ALWAYS AS IDENTITY, 
    borough_id INT, 
    one_person INT, 
    married_couple INT, 
    civil_partnership INT, 
    cohabiting_couple INT, 
    lone_parent INT,
    multi_person INT,
    PRIMARY KEY (id),
    CONSTRAINT fk_borough
    FOREIGN KEY (borough_id)
    REFERENCES borough(id)
);
