DROP TABLE IF EXISTS age_data; 

CREATE TABLE age__data (
    id INT GENERATED ALWAYS AS IDENTITY,
    borough_id INT, 
    0-9 INT,
    10-17 INT,
    18-26 INT,
    27-35 INT,
    36-44 INT, 
    45-53 INT,
    54-62 INT, 
    63-71 INT,
    72-80 INT, 
    81+ INT, 
    PRIMARY KEY (id),
    CONSTRAINT fk_borough
    FOREIGN KEY (borough_id)
    REFERENCES borough(id)
);
