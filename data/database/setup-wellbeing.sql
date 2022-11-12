DROP TABLE IF EXISTS wellbeing_data; 

CREATE TABLE wellbeing_data (
    id INT GENERATED ALWAYS AS IDENTITY, 
    borough_name VARCHAR(100), 
    life_satisfaction REAL, 
    worthwhile REAL, 
    happiness REAL, 
    anxiety REAL, 
    wellbeing REAL,
    PRIMARY KEY (id)
);
