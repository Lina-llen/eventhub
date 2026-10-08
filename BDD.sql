-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: eventhub
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--

-- Création et sélection de la base
CREATE DATABASE IF NOT EXISTS `eventhub`;
USE `eventhub`;

-- Création de l'utilisateur et attribution des droits
CREATE USER IF NOT EXISTS 'event_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT SELECT, INSERT, UPDATE, DELETE ON `eventhub`.* TO 'event_user'@'localhost';
FLUSH PRIVILEGES;


-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `co_id` int NOT NULL AUTO_INCREMENT,
  `co_comment` text,
  `co_user` int NOT NULL,
  `co_event` int NOT NULL,
  PRIMARY KEY (`co_id`),
  KEY `co_user` (`co_user`),
  KEY `co_event` (`co_event`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`co_user`) REFERENCES `users` (`us_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`co_event`) REFERENCES `events` (`ev_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,'Ceci est un NOUVEAU com',6,3);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `ev_id` int NOT NULL AUTO_INCREMENT,
  `ev_title` varchar(255) NOT NULL,
  `ev_description` text,
  `ev_date` date DEFAULT NULL,
  `ev_location` varchar(255) DEFAULT NULL,
  `ev_owner` int NOT NULL,
  PRIMARY KEY (`ev_id`),
  KEY `ev_owner` (`ev_owner`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`ev_owner`) REFERENCES `users` (`us_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (3,'event1','cecie st un event','2026-10-20','ici',6);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `pa_user` int NOT NULL,
  `pa_event` int NOT NULL,
  PRIMARY KEY (`pa_user`,`pa_event`),
  KEY `pa_event` (`pa_event`),
  CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`pa_user`) REFERENCES `users` (`us_id`),
  CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`pa_event`) REFERENCES `events` (`ev_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (7,3);
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `us_id` int NOT NULL AUTO_INCREMENT,
  `us_username` varchar(255) NOT NULL,
  `us_password` text NOT NULL,
  `us_email` varchar(255) NOT NULL,
  PRIMARY KEY (`us_id`),
  UNIQUE KEY `us_username` (`us_username`),
  UNIQUE KEY `us_email` (`us_email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'user1','$2b$10$meD16Qf.k2PMd2vq12HHtO.Pmq/uorsk.EshT/.a1nAsIKEMfyPFa','user1@mail.com'),(7,'user2','$2b$10$sAveOxxKVsNsl.zlJEXHse8bP7RVtKUGdXqnNkbMt4ZNKqHXlZ09W','user2@mail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-08 13:13:32
