DROP TABLE IF EXISTS borough;

CREATE TABLE borough (
    id INT GENERATED ALWAYS AS IDENTITY,
    borough_name VARCHAR(100),
    second_lang VARCHAR(50), 
    motto VARCHAR(100), 
    expect VARCHAR(200), 
    checkout VARCHAR(200),
    PRIMARY KEY (id)
)
