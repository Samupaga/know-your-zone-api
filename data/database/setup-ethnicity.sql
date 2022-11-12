DROP TABLE IF EXISTS ethnicity_data; 

CREATE TABLE ethnicity_data (
    id INT GENERATED ALWAYS AS IDENTITY, 
    borough_name VARCHAR(1000), 
    white INT, 
    asian INT, 
    black INT, 
    other INT, 
    total_population INT, 
    PRIMARY KEY (id)
);
