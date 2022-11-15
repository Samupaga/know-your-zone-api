DROP TABLE IF EXISTS ethnicity_data; 

CREATE TABLE ethnicity_data (
    id INT GENERATED ALWAYS AS IDENTITY, 
    borough_id INT, 
    white INT, 
    asian INT, 
    black INT, 
    other INT, 
    total_population INT, 
    second_lang VARCHAR(50), 
    PRIMARY KEY (id),
    CONSTRAINT fk_borough
    FOREIGN KEY (borough_id)
    REFERENCES borough(id)
);
