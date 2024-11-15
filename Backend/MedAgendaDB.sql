-- phpMyAdmin SQL Dump
-- version 5.2.1-2.fc39
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 29, 2024 at 04:46 AM
-- Server version: 10.5.25-MariaDB
-- PHP Version: 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MedAgendaDB`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertFakeDoctors` ()   BEGIN
  DECLARE i INT DEFAULT 1;
  
  WHILE i <= 100 DO
    INSERT INTO doctores (
      dr_nombre1, dr_nombre2, dr_apellido1, dr_apellido2, dr_especialidad,
      dr_telefono, dr_correo, dr_consultorio, experiencia, universidad, licencia, usuario, contraseña
    ) VALUES (
      CONCAT('Nombre', i),                         -- dr_nombre1
      CONCAT('SegNombre', i),                  -- dr_nombre2
      CONCAT('Apellido', i),                       -- dr_apellido1
      CONCAT('SegApellido', i),                -- dr_apellido2
      CASE                                         -- dr_especialidad (especialidad aleatoria)
        WHEN i % 5 = 0 THEN 'Cardiología'
        WHEN i % 5 = 1 THEN 'Pediatría'
        WHEN i % 5 = 2 THEN 'Dermatología'
        WHEN i % 5 = 3 THEN 'Neurología'
        ELSE 'Ginecología'
      END,
      CONCAT('300', FLOOR(RAND() * 1000000)),      -- dr_telefono
      CONCAT('doctor', i, '@emailficticio.com'),   -- dr_correo
      CONCAT('Consultorio ', i),                   -- dr_consultorio
      FLOOR(RAND() * 30),                          -- experiencia (0 a 30 años)
      CONCAT('Universidad ', i),                   -- universidad
      CONCAT('Licencia', i),                       -- licencia
      CONCAT('usuario', i),                        -- usuario
      'contraseña123'                              -- contraseña (ficticia)
    );
    SET i = i + 1;
  END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `citas`
--

CREATE TABLE `citas` (
  `id_cita` int(11) NOT NULL,
  `fecha_hora_cita` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_paciente_invol` int(11) DEFAULT NULL,
  `id_dr_encar` int(11) DEFAULT NULL,
  `motivo` text DEFAULT NULL,
  `estado_cita` enum('Activa','Inactiva') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `disponibilidad`
--

CREATE TABLE `disponibilidad` (
  `id_disponibilidad` int(11) NOT NULL,
  `id_doctor` int(11) NOT NULL,
  `dia_semana` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctores`
--

CREATE TABLE `doctores` (
  `dr_id` int(11) NOT NULL,
  `dr_nombre1` varchar(15) NOT NULL,
  `dr_nombre2` varchar(15) DEFAULT NULL,
  `dr_apellido1` varchar(15) NOT NULL,
  `dr_apellido2` varchar(15) DEFAULT NULL,
  `dr_especialidad` varchar(25) NOT NULL,
  `dr_telefono` varchar(15) NOT NULL,
  `dr_correo` varchar(255) DEFAULT NULL,
  `dr_id_disponibilidad` int(11) DEFAULT NULL,
  `dr_consultorio` varchar(15) DEFAULT NULL,
  `dr_id_facturacion` int(11) DEFAULT NULL,
  `experiencia` int(11) DEFAULT NULL,
  `universidad` varchar(50) DEFAULT NULL,
  `licencia` varchar(20) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `doctores`
--

INSERT INTO `doctores` (`dr_id`, `dr_nombre1`, `dr_nombre2`, `dr_apellido1`, `dr_apellido2`, `dr_especialidad`, `dr_telefono`, `dr_correo`, `dr_id_disponibilidad`, `dr_consultorio`, `dr_id_facturacion`, `experiencia`, `universidad`, `licencia`, `usuario`, `contraseña`) VALUES
(2, 'Nombre1', 'SegundoNombre1', 'Apellido1', 'SegApellido1', 'Pediatría', '300665936', 'doctor1@emailficticio.com', NULL, 'Consultorio 1', NULL, 15, 'Universidad 1', 'Licencia1', 'usuario1', 'contraseña123'),
(3, 'Nombre2', 'SegundoNombre2', 'Apellido2', 'SegApellido2', 'Dermatología', '300606167', 'doctor2@emailficticio.com', NULL, 'Consultorio 2', NULL, 14, 'Universidad 2', 'Licencia2', 'usuario2', 'contraseña123'),
(4, 'Nombre3', 'SegundoNombre3', 'Apellido3', 'SegApellido3', 'Neurología', '300523750', 'doctor3@emailficticio.com', NULL, 'Consultorio 3', NULL, 6, 'Universidad 3', 'Licencia3', 'usuario3', 'contraseña123'),
(5, 'Nombre4', 'SegundoNombre4', 'Apellido4', 'SegApellido4', 'Ginecología', '300495759', 'doctor4@emailficticio.com', NULL, 'Consultorio 4', NULL, 25, 'Universidad 4', 'Licencia4', 'usuario4', 'contraseña123'),
(6, 'Nombre5', 'SegundoNombre5', 'Apellido5', 'SegApellido5', 'Cardiología', '300705677', 'doctor5@emailficticio.com', NULL, 'Consultorio 5', NULL, 0, 'Universidad 5', 'Licencia5', 'usuario5', 'contraseña123'),
(7, 'Nombre6', 'SegundoNombre6', 'Apellido6', 'SegApellido6', 'Pediatría', '300946030', 'doctor6@emailficticio.com', NULL, 'Consultorio 6', NULL, 20, 'Universidad 6', 'Licencia6', 'usuario6', 'contraseña123'),
(8, 'Nombre7', 'SegundoNombre7', 'Apellido7', 'SegApellido7', 'Dermatología', '300623482', 'doctor7@emailficticio.com', NULL, 'Consultorio 7', NULL, 1, 'Universidad 7', 'Licencia7', 'usuario7', 'contraseña123'),
(9, 'Nombre8', 'SegundoNombre8', 'Apellido8', 'SegApellido8', 'Neurología', '300331886', 'doctor8@emailficticio.com', NULL, 'Consultorio 8', NULL, 16, 'Universidad 8', 'Licencia8', 'usuario8', 'contraseña123'),
(10, 'Nombre9', 'SegundoNombre9', 'Apellido9', 'SegApellido9', 'Ginecología', '300694504', 'doctor9@emailficticio.com', NULL, 'Consultorio 9', NULL, 25, 'Universidad 9', 'Licencia9', 'usuario9', 'contraseña123'),
(11, 'Nombre10', 'SegundoNombre10', 'Apellido10', 'SegApellido10', 'Cardiología', '300208613', 'doctor10@emailficticio.com', NULL, 'Consultorio 10', NULL, 14, 'Universidad 10', 'Licencia10', 'usuario10', 'contraseña123'),
(12, 'Nombre11', 'SegundoNombre11', 'Apellido11', 'SegApellido11', 'Pediatría', '300713108', 'doctor11@emailficticio.com', NULL, 'Consultorio 11', NULL, 4, 'Universidad 11', 'Licencia11', 'usuario11', 'contraseña123'),
(13, 'Nombre12', 'SegundoNombre12', 'Apellido12', 'SegApellido12', 'Dermatología', '300671549', 'doctor12@emailficticio.com', NULL, 'Consultorio 12', NULL, 26, 'Universidad 12', 'Licencia12', 'usuario12', 'contraseña123'),
(14, 'Nombre13', 'SegundoNombre13', 'Apellido13', 'SegApellido13', 'Neurología', '300341463', 'doctor13@emailficticio.com', NULL, 'Consultorio 13', NULL, 2, 'Universidad 13', 'Licencia13', 'usuario13', 'contraseña123'),
(15, 'Nombre14', 'SegundoNombre14', 'Apellido14', 'SegApellido14', 'Ginecología', '300443861', 'doctor14@emailficticio.com', NULL, 'Consultorio 14', NULL, 28, 'Universidad 14', 'Licencia14', 'usuario14', 'contraseña123'),
(16, 'Nombre15', 'SegundoNombre15', 'Apellido15', 'SegApellido15', 'Cardiología', '300360191', 'doctor15@emailficticio.com', NULL, 'Consultorio 15', NULL, 29, 'Universidad 15', 'Licencia15', 'usuario15', 'contraseña123'),
(17, 'Nombre16', 'SegundoNombre16', 'Apellido16', 'SegApellido16', 'Pediatría', '300848881', 'doctor16@emailficticio.com', NULL, 'Consultorio 16', NULL, 8, 'Universidad 16', 'Licencia16', 'usuario16', 'contraseña123'),
(18, 'Nombre17', 'SegundoNombre17', 'Apellido17', 'SegApellido17', 'Dermatología', '300887035', 'doctor17@emailficticio.com', NULL, 'Consultorio 17', NULL, 17, 'Universidad 17', 'Licencia17', 'usuario17', 'contraseña123'),
(19, 'Nombre18', 'SegundoNombre18', 'Apellido18', 'SegApellido18', 'Neurología', '300213728', 'doctor18@emailficticio.com', NULL, 'Consultorio 18', NULL, 10, 'Universidad 18', 'Licencia18', 'usuario18', 'contraseña123'),
(20, 'Nombre19', 'SegundoNombre19', 'Apellido19', 'SegApellido19', 'Ginecología', '30077531', 'doctor19@emailficticio.com', NULL, 'Consultorio 19', NULL, 10, 'Universidad 19', 'Licencia19', 'usuario19', 'contraseña123'),
(21, 'Nombre20', 'SegundoNombre20', 'Apellido20', 'SegApellido20', 'Cardiología', '300549532', 'doctor20@emailficticio.com', NULL, 'Consultorio 20', NULL, 20, 'Universidad 20', 'Licencia20', 'usuario20', 'contraseña123'),
(22, 'Nombre21', 'SegundoNombre21', 'Apellido21', 'SegApellido21', 'Pediatría', '300743331', 'doctor21@emailficticio.com', NULL, 'Consultorio 21', NULL, 20, 'Universidad 21', 'Licencia21', 'usuario21', 'contraseña123'),
(23, 'Nombre22', 'SegundoNombre22', 'Apellido22', 'SegApellido22', 'Dermatología', '300177516', 'doctor22@emailficticio.com', NULL, 'Consultorio 22', NULL, 25, 'Universidad 22', 'Licencia22', 'usuario22', 'contraseña123'),
(24, 'Nombre23', 'SegundoNombre23', 'Apellido23', 'SegApellido23', 'Neurología', '300682817', 'doctor23@emailficticio.com', NULL, 'Consultorio 23', NULL, 26, 'Universidad 23', 'Licencia23', 'usuario23', 'contraseña123'),
(25, 'Nombre24', 'SegundoNombre24', 'Apellido24', 'SegApellido24', 'Ginecología', '300375896', 'doctor24@emailficticio.com', NULL, 'Consultorio 24', NULL, 6, 'Universidad 24', 'Licencia24', 'usuario24', 'contraseña123'),
(26, 'Nombre25', 'SegundoNombre25', 'Apellido25', 'SegApellido25', 'Cardiología', '300996668', 'doctor25@emailficticio.com', NULL, 'Consultorio 25', NULL, 9, 'Universidad 25', 'Licencia25', 'usuario25', 'contraseña123'),
(27, 'Nombre26', 'SegundoNombre26', 'Apellido26', 'SegApellido26', 'Pediatría', '300553631', 'doctor26@emailficticio.com', NULL, 'Consultorio 26', NULL, 25, 'Universidad 26', 'Licencia26', 'usuario26', 'contraseña123'),
(28, 'Nombre27', 'SegundoNombre27', 'Apellido27', 'SegApellido27', 'Dermatología', '300548982', 'doctor27@emailficticio.com', NULL, 'Consultorio 27', NULL, 6, 'Universidad 27', 'Licencia27', 'usuario27', 'contraseña123'),
(29, 'Nombre28', 'SegundoNombre28', 'Apellido28', 'SegApellido28', 'Neurología', '300447983', 'doctor28@emailficticio.com', NULL, 'Consultorio 28', NULL, 17, 'Universidad 28', 'Licencia28', 'usuario28', 'contraseña123'),
(30, 'Nombre29', 'SegundoNombre29', 'Apellido29', 'SegApellido29', 'Ginecología', '300570846', 'doctor29@emailficticio.com', NULL, 'Consultorio 29', NULL, 3, 'Universidad 29', 'Licencia29', 'usuario29', 'contraseña123'),
(31, 'Nombre30', 'SegundoNombre30', 'Apellido30', 'SegApellido30', 'Cardiología', '300814231', 'doctor30@emailficticio.com', NULL, 'Consultorio 30', NULL, 22, 'Universidad 30', 'Licencia30', 'usuario30', 'contraseña123'),
(32, 'Nombre31', 'SegundoNombre31', 'Apellido31', 'SegApellido31', 'Pediatría', '300332786', 'doctor31@emailficticio.com', NULL, 'Consultorio 31', NULL, 11, 'Universidad 31', 'Licencia31', 'usuario31', 'contraseña123'),
(33, 'Nombre32', 'SegundoNombre32', 'Apellido32', 'SegApellido32', 'Dermatología', '300994855', 'doctor32@emailficticio.com', NULL, 'Consultorio 32', NULL, 23, 'Universidad 32', 'Licencia32', 'usuario32', 'contraseña123'),
(34, 'Nombre33', 'SegundoNombre33', 'Apellido33', 'SegApellido33', 'Neurología', '300907172', 'doctor33@emailficticio.com', NULL, 'Consultorio 33', NULL, 6, 'Universidad 33', 'Licencia33', 'usuario33', 'contraseña123'),
(35, 'Nombre34', 'SegundoNombre34', 'Apellido34', 'SegApellido34', 'Ginecología', '300282579', 'doctor34@emailficticio.com', NULL, 'Consultorio 34', NULL, 24, 'Universidad 34', 'Licencia34', 'usuario34', 'contraseña123'),
(36, 'Nombre35', 'SegundoNombre35', 'Apellido35', 'SegApellido35', 'Cardiología', '300204452', 'doctor35@emailficticio.com', NULL, 'Consultorio 35', NULL, 17, 'Universidad 35', 'Licencia35', 'usuario35', 'contraseña123'),
(37, 'Nombre36', 'SegundoNombre36', 'Apellido36', 'SegApellido36', 'Pediatría', '300341376', 'doctor36@emailficticio.com', NULL, 'Consultorio 36', NULL, 28, 'Universidad 36', 'Licencia36', 'usuario36', 'contraseña123'),
(38, 'Nombre37', 'SegundoNombre37', 'Apellido37', 'SegApellido37', 'Dermatología', '300646081', 'doctor37@emailficticio.com', NULL, 'Consultorio 37', NULL, 12, 'Universidad 37', 'Licencia37', 'usuario37', 'contraseña123'),
(39, 'Nombre38', 'SegundoNombre38', 'Apellido38', 'SegApellido38', 'Neurología', '300203154', 'doctor38@emailficticio.com', NULL, 'Consultorio 38', NULL, 21, 'Universidad 38', 'Licencia38', 'usuario38', 'contraseña123'),
(40, 'Nombre39', 'SegundoNombre39', 'Apellido39', 'SegApellido39', 'Ginecología', '30045204', 'doctor39@emailficticio.com', NULL, 'Consultorio 39', NULL, 0, 'Universidad 39', 'Licencia39', 'usuario39', 'contraseña123'),
(41, 'Nombre40', 'SegundoNombre40', 'Apellido40', 'SegApellido40', 'Cardiología', '30030501', 'doctor40@emailficticio.com', NULL, 'Consultorio 40', NULL, 1, 'Universidad 40', 'Licencia40', 'usuario40', 'contraseña123'),
(42, 'Nombre41', 'SegundoNombre41', 'Apellido41', 'SegApellido41', 'Pediatría', '300172687', 'doctor41@emailficticio.com', NULL, 'Consultorio 41', NULL, 21, 'Universidad 41', 'Licencia41', 'usuario41', 'contraseña123'),
(43, 'Nombre42', 'SegundoNombre42', 'Apellido42', 'SegApellido42', 'Dermatología', '3006551', 'doctor42@emailficticio.com', NULL, 'Consultorio 42', NULL, 27, 'Universidad 42', 'Licencia42', 'usuario42', 'contraseña123'),
(44, 'Nombre43', 'SegundoNombre43', 'Apellido43', 'SegApellido43', 'Neurología', '300570288', 'doctor43@emailficticio.com', NULL, 'Consultorio 43', NULL, 2, 'Universidad 43', 'Licencia43', 'usuario43', 'contraseña123'),
(45, 'Nombre44', 'SegundoNombre44', 'Apellido44', 'SegApellido44', 'Ginecología', '300776511', 'doctor44@emailficticio.com', NULL, 'Consultorio 44', NULL, 17, 'Universidad 44', 'Licencia44', 'usuario44', 'contraseña123'),
(46, 'Nombre45', 'SegundoNombre45', 'Apellido45', 'SegApellido45', 'Cardiología', '300621132', 'doctor45@emailficticio.com', NULL, 'Consultorio 45', NULL, 10, 'Universidad 45', 'Licencia45', 'usuario45', 'contraseña123'),
(47, 'Nombre46', 'SegundoNombre46', 'Apellido46', 'SegApellido46', 'Pediatría', '300812910', 'doctor46@emailficticio.com', NULL, 'Consultorio 46', NULL, 1, 'Universidad 46', 'Licencia46', 'usuario46', 'contraseña123'),
(48, 'Nombre47', 'SegundoNombre47', 'Apellido47', 'SegApellido47', 'Dermatología', '300855104', 'doctor47@emailficticio.com', NULL, 'Consultorio 47', NULL, 2, 'Universidad 47', 'Licencia47', 'usuario47', 'contraseña123'),
(49, 'Nombre48', 'SegundoNombre48', 'Apellido48', 'SegApellido48', 'Neurología', '300930784', 'doctor48@emailficticio.com', NULL, 'Consultorio 48', NULL, 10, 'Universidad 48', 'Licencia48', 'usuario48', 'contraseña123'),
(50, 'Nombre49', 'SegundoNombre49', 'Apellido49', 'SegApellido49', 'Ginecología', '300988976', 'doctor49@emailficticio.com', NULL, 'Consultorio 49', NULL, 26, 'Universidad 49', 'Licencia49', 'usuario49', 'contraseña123'),
(51, 'Nombre50', 'SegundoNombre50', 'Apellido50', 'SegApellido50', 'Cardiología', '300413493', 'doctor50@emailficticio.com', NULL, 'Consultorio 50', NULL, 13, 'Universidad 50', 'Licencia50', 'usuario50', 'contraseña123'),
(52, 'Nombre51', 'SegundoNombre51', 'Apellido51', 'SegApellido51', 'Pediatría', '300955582', 'doctor51@emailficticio.com', NULL, 'Consultorio 51', NULL, 13, 'Universidad 51', 'Licencia51', 'usuario51', 'contraseña123'),
(53, 'Nombre52', 'SegundoNombre52', 'Apellido52', 'SegApellido52', 'Dermatología', '300434629', 'doctor52@emailficticio.com', NULL, 'Consultorio 52', NULL, 23, 'Universidad 52', 'Licencia52', 'usuario52', 'contraseña123'),
(54, 'Nombre53', 'SegundoNombre53', 'Apellido53', 'SegApellido53', 'Neurología', '300657713', 'doctor53@emailficticio.com', NULL, 'Consultorio 53', NULL, 27, 'Universidad 53', 'Licencia53', 'usuario53', 'contraseña123'),
(55, 'Nombre54', 'SegundoNombre54', 'Apellido54', 'SegApellido54', 'Ginecología', '300584900', 'doctor54@emailficticio.com', NULL, 'Consultorio 54', NULL, 5, 'Universidad 54', 'Licencia54', 'usuario54', 'contraseña123'),
(56, 'Nombre55', 'SegundoNombre55', 'Apellido55', 'SegApellido55', 'Cardiología', '300193686', 'doctor55@emailficticio.com', NULL, 'Consultorio 55', NULL, 11, 'Universidad 55', 'Licencia55', 'usuario55', 'contraseña123'),
(57, 'Nombre56', 'SegundoNombre56', 'Apellido56', 'SegApellido56', 'Pediatría', '300415932', 'doctor56@emailficticio.com', NULL, 'Consultorio 56', NULL, 26, 'Universidad 56', 'Licencia56', 'usuario56', 'contraseña123'),
(58, 'Nombre57', 'SegundoNombre57', 'Apellido57', 'SegApellido57', 'Dermatología', '300159549', 'doctor57@emailficticio.com', NULL, 'Consultorio 57', NULL, 4, 'Universidad 57', 'Licencia57', 'usuario57', 'contraseña123'),
(59, 'Nombre58', 'SegundoNombre58', 'Apellido58', 'SegApellido58', 'Neurología', '300288049', 'doctor58@emailficticio.com', NULL, 'Consultorio 58', NULL, 29, 'Universidad 58', 'Licencia58', 'usuario58', 'contraseña123'),
(60, 'Nombre59', 'SegundoNombre59', 'Apellido59', 'SegApellido59', 'Ginecología', '30036985', 'doctor59@emailficticio.com', NULL, 'Consultorio 59', NULL, 7, 'Universidad 59', 'Licencia59', 'usuario59', 'contraseña123'),
(61, 'Nombre60', 'SegundoNombre60', 'Apellido60', 'SegApellido60', 'Cardiología', '300110274', 'doctor60@emailficticio.com', NULL, 'Consultorio 60', NULL, 24, 'Universidad 60', 'Licencia60', 'usuario60', 'contraseña123'),
(62, 'Nombre61', 'SegundoNombre61', 'Apellido61', 'SegApellido61', 'Pediatría', '300762344', 'doctor61@emailficticio.com', NULL, 'Consultorio 61', NULL, 10, 'Universidad 61', 'Licencia61', 'usuario61', 'contraseña123'),
(63, 'Nombre62', 'SegundoNombre62', 'Apellido62', 'SegApellido62', 'Dermatología', '300492079', 'doctor62@emailficticio.com', NULL, 'Consultorio 62', NULL, 11, 'Universidad 62', 'Licencia62', 'usuario62', 'contraseña123'),
(64, 'Nombre63', 'SegundoNombre63', 'Apellido63', 'SegApellido63', 'Neurología', '300488402', 'doctor63@emailficticio.com', NULL, 'Consultorio 63', NULL, 7, 'Universidad 63', 'Licencia63', 'usuario63', 'contraseña123'),
(65, 'Nombre64', 'SegundoNombre64', 'Apellido64', 'SegApellido64', 'Ginecología', '300850937', 'doctor64@emailficticio.com', NULL, 'Consultorio 64', NULL, 13, 'Universidad 64', 'Licencia64', 'usuario64', 'contraseña123'),
(66, 'Nombre65', 'SegundoNombre65', 'Apellido65', 'SegApellido65', 'Cardiología', '300772191', 'doctor65@emailficticio.com', NULL, 'Consultorio 65', NULL, 13, 'Universidad 65', 'Licencia65', 'usuario65', 'contraseña123'),
(67, 'Nombre66', 'SegundoNombre66', 'Apellido66', 'SegApellido66', 'Pediatría', '30013195', 'doctor66@emailficticio.com', NULL, 'Consultorio 66', NULL, 20, 'Universidad 66', 'Licencia66', 'usuario66', 'contraseña123'),
(68, 'Nombre67', 'SegundoNombre67', 'Apellido67', 'SegApellido67', 'Dermatología', '300300997', 'doctor67@emailficticio.com', NULL, 'Consultorio 67', NULL, 15, 'Universidad 67', 'Licencia67', 'usuario67', 'contraseña123'),
(69, 'Nombre68', 'SegundoNombre68', 'Apellido68', 'SegApellido68', 'Neurología', '300600186', 'doctor68@emailficticio.com', NULL, 'Consultorio 68', NULL, 14, 'Universidad 68', 'Licencia68', 'usuario68', 'contraseña123'),
(70, 'Nombre69', 'SegundoNombre69', 'Apellido69', 'SegApellido69', 'Ginecología', '300694565', 'doctor69@emailficticio.com', NULL, 'Consultorio 69', NULL, 29, 'Universidad 69', 'Licencia69', 'usuario69', 'contraseña123'),
(71, 'Nombre70', 'SegundoNombre70', 'Apellido70', 'SegApellido70', 'Cardiología', '300795063', 'doctor70@emailficticio.com', NULL, 'Consultorio 70', NULL, 1, 'Universidad 70', 'Licencia70', 'usuario70', 'contraseña123'),
(72, 'Nombre71', 'SegundoNombre71', 'Apellido71', 'SegApellido71', 'Pediatría', '300855127', 'doctor71@emailficticio.com', NULL, 'Consultorio 71', NULL, 3, 'Universidad 71', 'Licencia71', 'usuario71', 'contraseña123'),
(73, 'Nombre72', 'SegundoNombre72', 'Apellido72', 'SegApellido72', 'Dermatología', '30091848', 'doctor72@emailficticio.com', NULL, 'Consultorio 72', NULL, 1, 'Universidad 72', 'Licencia72', 'usuario72', 'contraseña123'),
(74, 'Nombre73', 'SegundoNombre73', 'Apellido73', 'SegApellido73', 'Neurología', '30048967', 'doctor73@emailficticio.com', NULL, 'Consultorio 73', NULL, 1, 'Universidad 73', 'Licencia73', 'usuario73', 'contraseña123'),
(75, 'Nombre74', 'SegundoNombre74', 'Apellido74', 'SegApellido74', 'Ginecología', '300103746', 'doctor74@emailficticio.com', NULL, 'Consultorio 74', NULL, 11, 'Universidad 74', 'Licencia74', 'usuario74', 'contraseña123'),
(76, 'Nombre75', 'SegundoNombre75', 'Apellido75', 'SegApellido75', 'Cardiología', '300530476', 'doctor75@emailficticio.com', NULL, 'Consultorio 75', NULL, 16, 'Universidad 75', 'Licencia75', 'usuario75', 'contraseña123'),
(77, 'Nombre76', 'SegundoNombre76', 'Apellido76', 'SegApellido76', 'Pediatría', '300145334', 'doctor76@emailficticio.com', NULL, 'Consultorio 76', NULL, 2, 'Universidad 76', 'Licencia76', 'usuario76', 'contraseña123'),
(78, 'Nombre77', 'SegundoNombre77', 'Apellido77', 'SegApellido77', 'Dermatología', '300987073', 'doctor77@emailficticio.com', NULL, 'Consultorio 77', NULL, 20, 'Universidad 77', 'Licencia77', 'usuario77', 'contraseña123'),
(79, 'Nombre78', 'SegundoNombre78', 'Apellido78', 'SegApellido78', 'Neurología', '300446379', 'doctor78@emailficticio.com', NULL, 'Consultorio 78', NULL, 5, 'Universidad 78', 'Licencia78', 'usuario78', 'contraseña123'),
(80, 'Nombre79', 'SegundoNombre79', 'Apellido79', 'SegApellido79', 'Ginecología', '300597558', 'doctor79@emailficticio.com', NULL, 'Consultorio 79', NULL, 12, 'Universidad 79', 'Licencia79', 'usuario79', 'contraseña123'),
(81, 'Nombre80', 'SegundoNombre80', 'Apellido80', 'SegApellido80', 'Cardiología', '300336197', 'doctor80@emailficticio.com', NULL, 'Consultorio 80', NULL, 12, 'Universidad 80', 'Licencia80', 'usuario80', 'contraseña123'),
(82, 'Nombre81', 'SegundoNombre81', 'Apellido81', 'SegApellido81', 'Pediatría', '3009716', 'doctor81@emailficticio.com', NULL, 'Consultorio 81', NULL, 25, 'Universidad 81', 'Licencia81', 'usuario81', 'contraseña123'),
(83, 'Nombre82', 'SegundoNombre82', 'Apellido82', 'SegApellido82', 'Dermatología', '300158839', 'doctor82@emailficticio.com', NULL, 'Consultorio 82', NULL, 8, 'Universidad 82', 'Licencia82', 'usuario82', 'contraseña123'),
(84, 'Nombre83', 'SegundoNombre83', 'Apellido83', 'SegApellido83', 'Neurología', '300930507', 'doctor83@emailficticio.com', NULL, 'Consultorio 83', NULL, 24, 'Universidad 83', 'Licencia83', 'usuario83', 'contraseña123'),
(85, 'Nombre84', 'SegundoNombre84', 'Apellido84', 'SegApellido84', 'Ginecología', '300250093', 'doctor84@emailficticio.com', NULL, 'Consultorio 84', NULL, 24, 'Universidad 84', 'Licencia84', 'usuario84', 'contraseña123'),
(86, 'Nombre85', 'SegundoNombre85', 'Apellido85', 'SegApellido85', 'Cardiología', '300377205', 'doctor85@emailficticio.com', NULL, 'Consultorio 85', NULL, 12, 'Universidad 85', 'Licencia85', 'usuario85', 'contraseña123'),
(87, 'Nombre86', 'SegundoNombre86', 'Apellido86', 'SegApellido86', 'Pediatría', '300916066', 'doctor86@emailficticio.com', NULL, 'Consultorio 86', NULL, 10, 'Universidad 86', 'Licencia86', 'usuario86', 'contraseña123'),
(88, 'Nombre87', 'SegundoNombre87', 'Apellido87', 'SegApellido87', 'Dermatología', '30010420', 'doctor87@emailficticio.com', NULL, 'Consultorio 87', NULL, 29, 'Universidad 87', 'Licencia87', 'usuario87', 'contraseña123'),
(89, 'Nombre88', 'SegundoNombre88', 'Apellido88', 'SegApellido88', 'Neurología', '300953386', 'doctor88@emailficticio.com', NULL, 'Consultorio 88', NULL, 23, 'Universidad 88', 'Licencia88', 'usuario88', 'contraseña123'),
(90, 'Nombre89', 'SegundoNombre89', 'Apellido89', 'SegApellido89', 'Ginecología', '30020556', 'doctor89@emailficticio.com', NULL, 'Consultorio 89', NULL, 23, 'Universidad 89', 'Licencia89', 'usuario89', 'contraseña123'),
(91, 'Nombre90', 'SegundoNombre90', 'Apellido90', 'SegApellido90', 'Cardiología', '300810096', 'doctor90@emailficticio.com', NULL, 'Consultorio 90', NULL, 21, 'Universidad 90', 'Licencia90', 'usuario90', 'contraseña123'),
(92, 'Nombre91', 'SegundoNombre91', 'Apellido91', 'SegApellido91', 'Pediatría', '300206825', 'doctor91@emailficticio.com', NULL, 'Consultorio 91', NULL, 25, 'Universidad 91', 'Licencia91', 'usuario91', 'contraseña123'),
(93, 'Nombre92', 'SegundoNombre92', 'Apellido92', 'SegApellido92', 'Dermatología', '300638823', 'doctor92@emailficticio.com', NULL, 'Consultorio 92', NULL, 19, 'Universidad 92', 'Licencia92', 'usuario92', 'contraseña123'),
(94, 'Nombre93', 'SegundoNombre93', 'Apellido93', 'SegApellido93', 'Neurología', '300276216', 'doctor93@emailficticio.com', NULL, 'Consultorio 93', NULL, 13, 'Universidad 93', 'Licencia93', 'usuario93', 'contraseña123'),
(95, 'Nombre94', 'SegundoNombre94', 'Apellido94', 'SegApellido94', 'Ginecología', '300498698', 'doctor94@emailficticio.com', NULL, 'Consultorio 94', NULL, 2, 'Universidad 94', 'Licencia94', 'usuario94', 'contraseña123'),
(96, 'Nombre95', 'SegundoNombre95', 'Apellido95', 'SegApellido95', 'Cardiología', '300989317', 'doctor95@emailficticio.com', NULL, 'Consultorio 95', NULL, 19, 'Universidad 95', 'Licencia95', 'usuario95', 'contraseña123'),
(97, 'Nombre96', 'SegundoNombre96', 'Apellido96', 'SegApellido96', 'Pediatría', '300308750', 'doctor96@emailficticio.com', NULL, 'Consultorio 96', NULL, 17, 'Universidad 96', 'Licencia96', 'usuario96', 'contraseña123'),
(98, 'Nombre97', 'SegundoNombre97', 'Apellido97', 'SegApellido97', 'Dermatología', '300962400', 'doctor97@emailficticio.com', NULL, 'Consultorio 97', NULL, 2, 'Universidad 97', 'Licencia97', 'usuario97', 'contraseña123'),
(99, 'Nombre98', 'SegundoNombre98', 'Apellido98', 'SegApellido98', 'Neurología', '300506848', 'doctor98@emailficticio.com', NULL, 'Consultorio 98', NULL, 8, 'Universidad 98', 'Licencia98', 'usuario98', 'contraseña123'),
(100, 'Nombre99', 'SegundoNombre99', 'Apellido99', 'SegApellido99', 'Ginecología', '300968514', 'doctor99@emailficticio.com', NULL, 'Consultorio 99', NULL, 28, 'Universidad 99', 'Licencia99', 'usuario99', 'contraseña123');

-- --------------------------------------------------------

--
-- Table structure for table `facturacion`
--

CREATE TABLE `facturacion` (
  `id_factura` int(11) NOT NULL,
  `id_cita` int(11) DEFAULT NULL,
  `fecha_factura` timestamp NOT NULL DEFAULT current_timestamp(),
  `monto` double UNSIGNED DEFAULT NULL,
  `estado_factura` enum('Pagada','Pendiente','En Mora') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historial_medico`
--

CREATE TABLE `historial_medico` (
  `id_historial` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

CREATE TABLE `notificaciones` (
  `notif_id` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_cita` int(11) DEFAULT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo_notif` enum('Recordatorio','Envio Receta','Cancelacion','Cambio') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL,
  `nombre1_paciente` varchar(10) NOT NULL,
  `nombre2_paciente` varchar(10) DEFAULT NULL,
  `apellido1_paciente` varchar(10) NOT NULL,
  `apellido2_paciente` varchar(10) DEFAULT NULL,
  `cedula_paciente` varchar(10) NOT NULL,
  `telefono_paciente` varchar(15) NOT NULL,
  `correo_paciente` varchar(255) NOT NULL,
  `direccion_paciente` varchar(50) NOT NULL,
  `no_historial_medico` int(11) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recetas`
--

CREATE TABLE `recetas` (
  `id_receta` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_doctor` int(11) DEFAULT NULL,
  `fecha_emision` timestamp NOT NULL DEFAULT current_timestamp(),
  `detalles_receta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `visita_medica`
--

CREATE TABLE `visita_medica` (
  `id_historial` int(11) NOT NULL,
  `id_cita` int(11) NOT NULL,
  `fecha_visita_medica` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_paciente_invol` (`id_paciente_invol`),
  ADD KEY `id_dr_encar` (`id_dr_encar`);

--
-- Indexes for table `disponibilidad`
--
ALTER TABLE `disponibilidad`
  ADD PRIMARY KEY (`id_disponibilidad`,`id_doctor`);

--
-- Indexes for table `doctores`
--
ALTER TABLE `doctores`
  ADD PRIMARY KEY (`dr_id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `dr_id_disponibilidad` (`dr_id_disponibilidad`),
  ADD KEY `dr_id_facturacion` (`dr_id_facturacion`);

--
-- Indexes for table `facturacion`
--
ALTER TABLE `facturacion`
  ADD PRIMARY KEY (`id_factura`);

--
-- Indexes for table `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD PRIMARY KEY (`id_historial`);

--
-- Indexes for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`notif_id`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_cita` (`id_cita`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`),
  ADD KEY `no_historial_medico` (`no_historial_medico`);

--
-- Indexes for table `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id_receta`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_doctor` (`id_doctor`);

--
-- Indexes for table `visita_medica`
--
ALTER TABLE `visita_medica`
  ADD PRIMARY KEY (`id_historial`,`id_cita`),
  ADD KEY `id_cita` (`id_cita`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `citas`
--
ALTER TABLE `citas`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `disponibilidad`
--
ALTER TABLE `disponibilidad`
  MODIFY `id_disponibilidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctores`
--
ALTER TABLE `doctores`
  MODIFY `dr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `facturacion`
--
ALTER TABLE `facturacion`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id_receta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_paciente_invol`) REFERENCES `pacientes` (`id_paciente`),
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_dr_encar`) REFERENCES `doctores` (`dr_id`);

--
-- Constraints for table `doctores`
--
ALTER TABLE `doctores`
  ADD CONSTRAINT `doctores_ibfk_1` FOREIGN KEY (`dr_id_disponibilidad`) REFERENCES `disponibilidad` (`id_disponibilidad`),
  ADD CONSTRAINT `doctores_ibfk_2` FOREIGN KEY (`dr_id_facturacion`) REFERENCES `facturacion` (`id_factura`);

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  ADD CONSTRAINT `notificaciones_ibfk_2` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id_cita`);

--
-- Constraints for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`no_historial_medico`) REFERENCES `historial_medico` (`id_historial`);

--
-- Constraints for table `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  ADD CONSTRAINT `recetas_ibfk_2` FOREIGN KEY (`id_doctor`) REFERENCES `doctores` (`dr_id`);

--
-- Constraints for table `visita_medica`
--
ALTER TABLE `visita_medica`
  ADD CONSTRAINT `visita_medica_ibfk_1` FOREIGN KEY (`id_historial`) REFERENCES `historial_medico` (`id_historial`),
  ADD CONSTRAINT `visita_medica_ibfk_2` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id_cita`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
