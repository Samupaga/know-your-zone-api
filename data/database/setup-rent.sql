DROP TABLE IF EXISTS rental_data;

CREATE TABLE rental_data (
    id INT GENERATED ALWAYS AS IDENTITY,
    borough_id INT,
    period_start_date DATE,
    period_end_date DATE,
    property_type VARCHAR(100),
    rent_median REAL,
    rent_mean REAL,
    PRIMARY KEY (id),
    CONSTRAINT fk_borough
    FOREIGN KEY (borough_id)
    REFERENCES borough(id)
);
