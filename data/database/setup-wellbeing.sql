DROP TABLE IF EXISTS wellbeing_data; 

CREATE TABLE wellbeing_data (
    id INT GENERATED ALWAYS AS IDENTITY,
    borough_id INT,
    life_satisfaction REAL,
    worthwhile REAL,
    happiness REAL,
    anxiety REAL,
    inverted_anxiety REAL,
    wellbeing REAL,
    PRIMARY KEY (id),
    CONSTRAINT fk_borough
    FOREIGN KEY (borough_id)
    REFERENCES borough(id)
);
