-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: sava
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `api_info`
--

DROP TABLE IF EXISTS `api_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_info` (
  `url` varchar(64) NOT NULL,
  `desc_zh_cn` varchar(256) NOT NULL,
  `desc_en_us` varchar(256) NOT NULL,
  `request` varchar(256) NOT NULL,
  `response` varchar(1024) NOT NULL,
  PRIMARY KEY (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cached_world_stat_info`
--

DROP TABLE IF EXISTS `cached_world_stat_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cached_world_stat_info` (
  `stat_date` date NOT NULL,
  `existing_confirmed_cnt` int NOT NULL,
  `death_cnt` int NOT NULL,
  `cured_cnt` int NOT NULL,
  PRIMARY KEY (`stat_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comp_record`
--

DROP TABLE IF EXISTS `comp_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comp_record` (
  `idx_of_usr` int NOT NULL,
  `usr_id` int NOT NULL,
  `comp_date` datetime NOT NULL,
  `seq_sha1_value` varchar(40) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `comp_result_path` varchar(256) DEFAULT NULL,
  `seq_file_path` varchar(256) NOT NULL,
  PRIMARY KEY (`idx_of_usr`,`usr_id`),
  KEY `comp_record_user_usr_id_fk` (`usr_id`),
  CONSTRAINT `comp_record_user_usr_id_fk` FOREIGN KEY (`usr_id`) REFERENCES `user` (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gene_info`
--

DROP TABLE IF EXISTS `gene_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gene_info` (
  `v_id` int NOT NULL,
  `cDNA_sequence_path` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`v_id`),
  CONSTRAINT `gene_info_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `variant` (`v_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `info_map`
--

DROP TABLE IF EXISTS `info_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `info_map` (
  `key` varchar(256) NOT NULL,
  `value` varchar(256) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lineage`
--

DROP TABLE IF EXISTS `lineage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lineage` (
  `child_variant_id` int NOT NULL,
  `parent_variant_id` int NOT NULL,
  PRIMARY KEY (`child_variant_id`,`parent_variant_id`),
  KEY `lineage_variant_v_id_fk_2` (`parent_variant_id`),
  CONSTRAINT `lineage_variant_v_id_fk` FOREIGN KEY (`child_variant_id`) REFERENCES `variant` (`v_id`),
  CONSTRAINT `lineage_variant_v_id_fk_2` FOREIGN KEY (`parent_variant_id`) REFERENCES `variant` (`v_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `idx` int NOT NULL,
  `title` varchar(64) NOT NULL,
  `content` varchar(1024) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pango_nomenclature`
--

DROP TABLE IF EXISTS `pango_nomenclature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pango_nomenclature` (
  `v_id` int NOT NULL,
  `variant` varchar(16) NOT NULL,
  PRIMARY KEY (`v_id`),
  UNIQUE KEY `variant` (`variant`),
  CONSTRAINT `pango_nomenclature_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `variant` (`v_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `region_id` int NOT NULL,
  `region_name` varchar(32) NOT NULL,
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `statistic`
--

DROP TABLE IF EXISTS `statistic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistic` (
  `region_id` int NOT NULL,
  `stat_date` date NOT NULL,
  `existing_confirmed_cnt` int NOT NULL,
  `death_cnt` int NOT NULL,
  `cured_cnt` int NOT NULL,
  PRIMARY KEY (`region_id`,`stat_date`),
  CONSTRAINT `statistic_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `region` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `usr_id` int NOT NULL,
  `usr_name` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  `passwd` blob NOT NULL,
  `salt` blob NOT NULL,
  `role` varchar(32) NOT NULL,
  `remain_comp_time` int NOT NULL DEFAULT '4',
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_watching`
--

DROP TABLE IF EXISTS `user_watching`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_watching` (
  `usr_id` int NOT NULL,
  `watching_v_id` int NOT NULL,
  PRIMARY KEY (`usr_id`,`watching_v_id`),
  KEY `watching_v_id` (`watching_v_id`),
  CONSTRAINT `user_watching_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `user` (`usr_id`),
  CONSTRAINT `user_watching_ibfk_2` FOREIGN KEY (`watching_v_id`) REFERENCES `variant` (`v_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_watching_region`
--

DROP TABLE IF EXISTS `user_watching_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_watching_region` (
  `usr_id` int NOT NULL,
  `watching_r_id` int NOT NULL,
  PRIMARY KEY (`usr_id`,`watching_r_id`),
  KEY `user_watching_region_region_region_id_fk` (`watching_r_id`),
  CONSTRAINT `user_watching_region_region_region_id_fk` FOREIGN KEY (`watching_r_id`) REFERENCES `region` (`region_id`),
  CONSTRAINT `user_watching_region_user_usr_id_fk` FOREIGN KEY (`usr_id`) REFERENCES `user` (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `v_id` int NOT NULL,
  `earliest_date` date DEFAULT NULL,
  `monitor_level` varchar(4) NOT NULL,
  `R0` float NOT NULL,
  `avg_incubation` float NOT NULL,
  `seq_cnt` int NOT NULL,
  `descript` varchar(256) DEFAULT NULL,
  `v_status` varchar(12) NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`v_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `who_label`
--

DROP TABLE IF EXISTS `who_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `who_label` (
  `v_id` int NOT NULL,
  `label` varchar(16) NOT NULL,
  PRIMARY KEY (`v_id`),
  CONSTRAINT `who_label_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `variant` (`v_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-09 12:48:07
