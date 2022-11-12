DROP TABLE IF EXISTS crime_data;

CREATE TABLE crime_data (
    id INT GENERATED ALWAYS AS IDENTITY,
    borough_name VARCHAR(100),
    period DATE,
    offence_category VARCHAR(500),
    offence_count INT,
    PRIMARY KEY (id)
);
