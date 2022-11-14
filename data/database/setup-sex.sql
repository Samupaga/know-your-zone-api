DROP TABLE IF EXISTS sex_data; 

CREATE TABLE sex_data (
    id INT GENERATED ALWAYS AS IDENTITY,
    borough_id INT,
    total_people INT, 
    males INT, 
    females INT, 
    m_100f REAL, 
    PRIMARY KEY (id),
    CONSTRAINT fk_borough
    FOREIGN KEY (borough_id)
    REFERENCES borough(id)
);
