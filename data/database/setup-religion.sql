DROP TABLE IF EXISTS religion_data;

CREATE TABLE religion_data (
    id INT GENERATED ALWAYS AS IDENTITY, 
    borough_id INT, 
    christian INT, 
    buddhist INT, 
    hindu INT,	
    jewish INT, 
    muslim INT,
    sikh INT,
    other_religion INT,
    no_religion INT,	
    total INT,
    PRIMARY KEY (id),
    CONSTRAINT fk_borough
    FOREIGN KEY (borough_id)
    REFERENCES borough(id)
);
