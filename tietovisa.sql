DROP TABLE IF EXISTS kysymykset;
DROP TABLE IF EXISTS kayttajat;

CREATE TABLE kysymykset (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    kysymys VARCHAR(255),
    vastaus VARCHAR(255)
)

CREATE TABLE kayttajat (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    knimi VARCHAR(10),
    tulos VARCHAR(5)
)

INSERT INTO kayttajat
VALUES (
    "1",
    "Testi",
    "6"
)

INSERT INTO kysymykset
VALUES (
        "1",
        "Mikä on Japanin pääkaupunki?",
        "Tokyo"
    ), (
        "2",
        "Mikä on Amerikan pääkaupunki?",
        "Washington"
    ), (
        "3",
        "Mikä on Korean pääkaupunki?",
        "Seoul"
    )