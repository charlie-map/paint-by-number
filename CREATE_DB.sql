DROP DATABASE IF EXISTS paint_by_number;

CREATE DATABASE paint_by_number;

USE paint_by_number;

CREATE TABLE
    image (
        id INT AUTO_INCREMENT,
        uid VARCHAR(20) NOT NULL UNIQUE,
        image TEXT,
        PRIMARY KEY (id)
    );
