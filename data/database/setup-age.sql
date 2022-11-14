DROP TABLE IF EXISTS age_data; 

CREATE TABLE age_data (
    id INT GENERATED ALWAYS AS IDENTITY,
    borough_id INT, 
    a0_9 INT,
    a10_17 INT,
    a18_26 INT,
    a27_35 INT,
    a36_44 INT, 
    a45_53 INT,
    a54_62 INT, 
    a63_71 INT,
    a72_80 INT, 
    a81_ INT, 
    PRIMARY KEY (id),
    CONSTRAINT fk_borough
    FOREIGN KEY (borough_id)
    REFERENCES borough(id)
);
