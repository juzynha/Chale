-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 01, 2025 at 02:08 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chale`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrador`
--

CREATE TABLE `administrador` (
  `admid` int NOT NULL,
  `admnome` varchar(50) DEFAULT NULL,
  `admmail` varchar(30) DEFAULT NULL,
  `admpass` varchar(15) DEFAULT NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `cliid` int NOT NULL,
  `cliinome` varchar(50) DEFAULT NULL,
  `clitel` varchar(15) DEFAULT NULL,
  `climail` varchar(30) DEFAULT NULL,
  `clidatnasc` date DEFAULT NULL,
  `clipass` varchar(15) DEFAULT NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Table structure for table `precos`
--

CREATE TABLE `precos` (
  `preid` int NOT NULL,
  `prechale` double DEFAULT NULL,
  `precamping` double DEFAULT NULL,
  `precolchao` double DEFAULT NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Table structure for table `promocoes`
--

CREATE TABLE `promocoes` (
  `promoid` int NOT NULL,
  `promonome` varchar(50) DEFAULT NULL,
  `promodataini` date DEFAULT NULL,
  `promodatafim` date DEFAULT NULL,
  `promoNpreco` double DEFAULT NULL,
  `promoativo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--

CREATE TABLE `reservas` (
  `resid` int NOT NULL,
  `rescheckin` date DEFAULT NULL,
  `rescheckout` date DEFAULT NULL,
  `rescliid` int DEFAULT NULL,
  `restip` varchar(15) DEFAULT NULL,
  `resnumcli` int DEFAULT NULL,
  `rescolchao` tinyint(1) DEFAULT '0',
  `resvtotal` double DEFAULT NULL,
  `resstatuspag` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`admid`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cliid`);

--
-- Indexes for table `precos`
--
ALTER TABLE `precos`
  ADD PRIMARY KEY (`preid`);

--
-- Indexes for table `promocoes`
--
ALTER TABLE `promocoes`
  ADD PRIMARY KEY (`promoid`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`resid`),
  ADD KEY `fkrescliid` (`rescliid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrador`
--
ALTER TABLE `administrador`
  MODIFY `admid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cliid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `precos`
--
ALTER TABLE `precos`
  MODIFY `preid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promocoes`
--
ALTER TABLE `promocoes`
  MODIFY `promoid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `resid` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fkrescliid` FOREIGN KEY (`rescliid`) REFERENCES `clientes` (`cliid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
