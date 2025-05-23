CREATE DATABASE IF NOT EXISTS tta_bdd;

USE tta_bdd;

CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'PalpatineMeilleurChien2019!';

GRANT ALL PRIVILEGES ON tta_bdd.* TO 'admin'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE ville (
   Id_ville INT AUTO_INCREMENT,
   ville_nom VARCHAR(50) NOT NULL,
   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(Id_ville),
   UNIQUE(ville_nom)
);

CREATE TABLE categorie (
   Id_categorie INT AUTO_INCREMENT,
   categorie_libelle VARCHAR(50) NOT NULL,
   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(Id_categorie)
);

CREATE TABLE specialite (
   Id_specialite INT AUTO_INCREMENT,
   specialite_libelle VARCHAR(150) NOT NULL,
   Id_categorie INT NOT NULL,
   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(Id_specialite),
   FOREIGN KEY(Id_categorie) REFERENCES categorie(Id_categorie)
);

CREATE TABLE artisan (
   Id_artisan INT AUTO_INCREMENT,
   artisan_nom VARCHAR(250) NOT NULL,
   artisan_email VARCHAR(250) NOT NULL,
   artisan_site VARCHAR(250),
   artisan_apropos TEXT NOT NULL,
   artisan_note DECIMAL(2,1) NOT NULL,
   artisan_top BOOLEAN NOT NULL,
   artisan_image VARCHAR(250),
   Id_specialite INT NOT NULL,
   Id_ville INT NOT NULL,
   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(Id_artisan),
   UNIQUE(artisan_email),
   FOREIGN KEY(Id_specialite) REFERENCES specialite(Id_specialite),
   FOREIGN KEY(Id_ville) REFERENCES ville(Id_ville)
);

-- Créer des tables temporaires le temps de faire les relations

CREATE TABLE import_ville (
  ville_nom VARCHAR(50)
);

CREATE TABLE import_categorie (
  categorie_libelle VARCHAR(50)
);

CREATE TABLE import_specialite (
  specialite_libelle VARCHAR(150),
  categorie_libelle VARCHAR(50)
);

CREATE TABLE import_artisan (
  artisan_nom VARCHAR(250),
  artisan_email VARCHAR(250),
  artisan_site VARCHAR(250),
  artisan_apropos TEXT,
  artisan_note DECIMAL(2,1),
  artisan_top BOOLEAN,
  artisan_image VARCHAR(250),
  specialite_libelle VARCHAR(150),
  ville_nom VARCHAR(50)
);

-- Insérer les datas dans les tables temporaires après l'exécution de ce script
SET GLOBAL local_infile = 1;
SHOW VARIABLES LIKE 'local_infile';
SHOW VARIABLES LIKE 'secure_file_priv';

LOAD DATA LOCAL INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/villeData.csv'
INTO TABLE import_ville
CHARACTER SET utf8mb4  
FIELDS TERMINATED BY ','  
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(ville_nom);

LOAD DATA LOCAL INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/categorieData.csv'  
INTO TABLE import_categorie
CHARACTER SET utf8mb4  
FIELDS TERMINATED BY ','  
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(categorie_libelle);

LOAD DATA LOCAL INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/specialiteData.csv'  
INTO TABLE import_specialite
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','  
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(specialite_libelle, categorie_libelle);

LOAD DATA LOCAL INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/artisanData.csv'
INTO TABLE import_artisan
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(artisan_nom, artisan_email, artisan_site, artisan_apropos, artisan_note, artisan_top, artisan_image, specialite_libelle, ville_nom);

-- Créer les relations et importer dans les vraies tables

INSERT INTO ville (ville_nom)
SELECT DISTINCT ville_nom FROM import_ville;

INSERT INTO categorie (categorie_libelle)
SELECT DISTINCT categorie_libelle FROM import_categorie;

INSERT INTO specialite (specialite_libelle, Id_categorie)
SELECT i.specialite_libelle, c.Id_categorie
FROM import_specialite i
JOIN categorie c ON c.categorie_libelle = i.categorie_libelle;

INSERT INTO artisan (
  artisan_nom, artisan_email, artisan_site, artisan_apropos,
  artisan_note, artisan_top, artisan_image, Id_specialite, Id_ville
)
SELECT 
  i.artisan_nom, i.artisan_email, i.artisan_site, i.artisan_apropos,
  i.artisan_note, i.artisan_top, i.artisan_image,
  s.Id_specialite, v.Id_ville
FROM import_artisan i
JOIN specialite s ON s.specialite_libelle = i.specialite_libelle
JOIN ville v ON v.ville_nom = i.ville_nom;

-- Si toutes les datas ont été bien insérées alors effacer les tables temporaires

DROP TABLE IF EXISTS import_ville;
DROP TABLE IF EXISTS import_categorie;
DROP TABLE IF EXISTS import_specialite;
DROP TABLE IF EXISTS import_artisan;