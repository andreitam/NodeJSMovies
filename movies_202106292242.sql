-- si.director definition

CREATE TABLE `director` (
  `director_id` int(11) NOT NULL AUTO_INCREMENT,
  `director_name` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  PRIMARY KEY (`director_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

INSERT INTO si.director (director_id, director_name, date_of_birth) VALUES(1, 'Steven Spilberg', '1946-12-18');
INSERT INTO si.director (director_id, director_name, date_of_birth) VALUES(2, 'Martin Scorsese', '1942-11-17');
INSERT INTO si.director (director_id, director_name, date_of_birth) VALUES(3, 'James Cameron', '1954-08-16');
INSERT INTO si.director (director_id, director_name, date_of_birth) VALUES(4, 'Christopher Nolan', '1970-07-30');

-- si.movies definition

CREATE TABLE `movies` (
  `imdbID` varchar(100) NOT NULL,
  `released` date NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `actors` varchar(256) DEFAULT NULL,
  `poster` varchar(256) DEFAULT NULL,
  `imdb_link` varchar(256) DEFAULT NULL,
  `imdbRating` double DEFAULT NULL,
  `director_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`imdbID`),
  KEY `director_id` (`director_id`),
  CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`director_id`) REFERENCES `director` (`director_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt0073195', '1975-06-19', 'Jaws', 'Roy Scheider, Robert Shaw, Richard Dreyfuss, Lorraine Gary', 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg', 'https://www.imdb.com/title/tt0073195', 8.0, 1);
INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt0099685', '1990-09-21', 'Goodfellas', 'Robert De Niro, Ray Liotta, Joe Pesci, Lorraine Bracco', 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 'https://www.imdb.com/title/tt0099685', 8.7, 2);
INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt0108052', '1994-02-04', 'Schindlers List', 'Liam Neeson, Ben Kingsley, Ralph Fiennes, Caroline Goodall', 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', 'https://www.imdb.com/title/tt0108052', 8.9, 1);
INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt0112641', '1995-11-22', 'Casino', 'Robert De Niro, Sharon Stone, Joe Pesci, James Woods', 'https://m.media-amazon.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg', 'https://www.imdb.com/title/tt0112641', 8.2, 2);
INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt0120338', '1997-12-19', 'Titanic', 'Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates', 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg', 'https://www.imdb.com/title/tt0120338', 7.8, 3);
INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt0468569', '2008-07-18', 'The Dark Knight', 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', 'https://www.imdb.com/title/tt0468569', 9.0, 4);
INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt0499549', '2009-12-18', 'Avatar', 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang', 'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg', 'https://www.imdb.com/title/tt0499549', 7.8, 3);
INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt0816692', '2014-11-07', 'Interstellar', 'Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', 'https://www.imdb.com/title/tt0816692', 8.6, 4);
INSERT INTO si.movies (imdbID, released, title, actors, poster, imdb_link, imdbRating, director_id) VALUES('tt1375666', '2010-07-16', 'Inception', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', 'https://www.imdb.com/title/tt1375666', 8.8, 4);
