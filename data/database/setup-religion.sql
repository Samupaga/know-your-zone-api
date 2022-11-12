DROP TABLE IF EXISTS religion_data;

CREATE TABLE religion_data (
    id INT GENERATED ALWAYS AS IDENTITY, 
    borough_name VARCHAR(100), 
    christian INT, 
    buddhist INT, 
    hindu INT,	
    jewish INT, 
    muslim	INT,
    sikh INT,
    other_religion INT,
    no_religion INT,	
    total INT,
    PRIMARY KEY (id)
);
