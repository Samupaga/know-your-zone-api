DROP TABLE IF EXISTS borough;

CREATE TABLE borough (
    id INT GENERATED ALWAYS AS IDENTITY,
    borough_name VARCHAR(100),
    motto VARCHAR(200), 
    PRIMARY KEY (id)
)
