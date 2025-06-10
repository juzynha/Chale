-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 10, 2025 at 02:03 PM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_usuario` (IN `nome` VARCHAR(100), IN `telefone` VARCHAR(20), IN `email` VARCHAR(100), IN `datanasc` DATE, IN `senha` VARCHAR(20), IN `foto` LONGBLOB, IN `tipo` ENUM('cliente','admin'))   BEGIN
    INSERT INTO usuarios (usunome,usutelefone,usuemail,usudatanasc,ususenha,usufoto,usutipo)
    VALUES (nome,telefone,email,datanasc,senha,foto,tipo);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_promocao` (IN `nome` VARCHAR(100), IN `datainicio` DATE, IN `datafim` DATE, IN `preco` DOUBLE, IN `precofds` DOUBLE)   BEGIN
    INSERT INTO promocoes(pronome, prodataini, prodatafim, pronpreco, pronprecofds)
    VALUES (nome, datainicio, datafim, preco, precofds);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_usuario_admin` (IN `nome` VARCHAR(150), IN `email` VARCHAR(100), IN `senha` VARCHAR(20))   BEGIN
    INSERT INTO usuarios (usunome, usuemail, ususenha, usutipo)
    values (nome, email, MD5(senha), 'admin');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_usuario_cliente` (IN `nome` VARCHAR(150), IN `telefone` VARCHAR(20), IN `email` VARCHAR(100), IN `datanasc` DATE, IN `senha` VARCHAR(20))   BEGIN
    INSERT INTO usuarios (usunome, usutelefone, usuemail, usudatanasc, ususenha, usutipo)
    values (nome, telefone, email, datanasc, MD5(senha), 'cliente');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletar_conta` (IN `id` INT)   BEGIN
   DELETE FROM usuarios WHERE usuid = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletar_promocao` (IN `id` INT)   BEGIN
    DELETE from promocoes WHERE proid = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_preco` (IN `id` INT, IN `precodiaria` DOUBLE, IN `precofds` DOUBLE)   BEGIN
    UPDATE precos SET prediaria = precodiaria, prediariafds = precofds WHERE preid = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editar_promocao` (IN `nome` VARCHAR(100), IN `datainicio` DATE, IN `datafim` DATE, IN `preco` DOUBLE, IN `precofds` DOUBLE, IN `ativo` BOOLEAN, IN `id` INT)   BEGIN
    UPDATE promocoes SET pronome = nome, prodataini = datainicio, prodatafim = datafim, pronpreco = preco, pronprecofds = precofds, proativo = ativo where proid = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `email` VARCHAR(100), IN `senha` VARCHAR(100))   BEGIN
    SELECT * FROM usuarios
    WHERE usuemail = email AND ususenha = senha;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `reservas_em_andamento` (IN `id` INT)   BEGIN
    select * from reservas WHERE resstatuspag = 0 AND resusuid = id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bloqueio_de_dia`
--

CREATE TABLE `bloqueio_de_dia` (
  `bloid` int NOT NULL,
  `blodinicial` date DEFAULT NULL,
  `blodfinal` date DEFAULT NULL,
  `blotipo` enum('reserva','manual','airbnb') COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carousel`
--

CREATE TABLE `carousel` (
  `carid` int NOT NULL,
  `carfoto` longblob,
  `carordem` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `carrosel`
-- (See below for the actual view)
--
CREATE TABLE `carrosel` (
`carid` int
,`carfoto` longblob
,`carordem` int
);

-- --------------------------------------------------------

--
-- Table structure for table `fotos`
--

CREATE TABLE `fotos` (
  `fotid` int NOT NULL,
  `fotarquivo` longblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `itens_sessoes`
--

CREATE TABLE `itens_sessoes` (
  `iteid` int NOT NULL,
  `itesessao` int DEFAULT NULL,
  `itefoto` longblob,
  `iteutilitario` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `lista_dias_bloqueados`
-- (See below for the actual view)
--
CREATE TABLE `lista_dias_bloqueados` (
`blodinicial` date
,`blodfinal` date
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `lista_precos`
-- (See below for the actual view)
--
CREATE TABLE `lista_precos` (
`preid` int
,`prediaria` double
,`prediariafds` double
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `lista_promocoes`
-- (See below for the actual view)
--
CREATE TABLE `lista_promocoes` (
`proid` int
,`pronome` varchar(100)
,`prodataini` date
,`prodatafim` date
,`pronpreco` double
,`pronprecofds` double
,`proativo` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `lista_reservas`
-- (See below for the actual view)
--
CREATE TABLE `lista_reservas` (
`resid` int
,`rescheckin` date
,`rescheckout` date
,`resvtotal` double
,`resstatuspag` tinyint(1)
,`usuid` int
,`usunome` varchar(150)
,`usutelefone` varchar(20)
,`usuemail` varchar(100)
,`usudatanasc` date
,`usufoto` longblob
);

-- --------------------------------------------------------

--
-- Table structure for table `precos`
--

CREATE TABLE `precos` (
  `preid` int NOT NULL,
  `prediaria` double DEFAULT NULL,
  `prediariafds` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promocoes`
--

CREATE TABLE `promocoes` (
  `proid` int NOT NULL,
  `pronome` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prodataini` date DEFAULT NULL,
  `prodatafim` date DEFAULT NULL,
  `pronpreco` double DEFAULT NULL,
  `pronprecofds` double DEFAULT NULL,
  `proativo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--

CREATE TABLE `reservas` (
  `resid` int NOT NULL,
  `rescheckin` date DEFAULT NULL,
  `rescheckout` date DEFAULT NULL,
  `resusuid` int DEFAULT NULL,
  `resvtotal` double DEFAULT NULL,
  `resstatuspag` tinyint(1) DEFAULT '0',
  `resprazopag` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservas`
--

INSERT INTO `reservas` (`resid`, `rescheckin`, `rescheckout`, `resusuid`, `resvtotal`, `resstatuspag`, `resprazopag`) VALUES
(1, '2025-06-05', '2025-07-05', 1, 500, 1, '2025-05-07 10:30:00'),
(2, '2025-06-05', '2025-07-05', 1, 500, 1, '2025-05-07 10:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `sessoes`
--

CREATE TABLE `sessoes` (
  `sesid` int NOT NULL,
  `sesnome` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sesreferencia` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usuid` int NOT NULL,
  `usunome` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usutelefone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usuemail` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usudatanasc` date DEFAULT NULL,
  `ususenha` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usufoto` longblob,
  `usutipo` enum('cliente','admin') COLLATE utf8mb4_general_ci DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usuid`, `usunome`, `usutelefone`, `usuemail`, `usudatanasc`, `ususenha`, `usufoto`, `usutipo`) VALUES
(1, 'Juliana Cardoso Araujo', '(14)99646-7035', 'julianacaraujo3103@gmail.com', '2008-03-31', '12345', '', 'cliente');

-- --------------------------------------------------------

--
-- Table structure for table `utilitarios`
--

CREATE TABLE `utilitarios` (
  `utiid` int NOT NULL,
  `utinome` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `utifoto` longblob,
  `utidescricao` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure for view `carrosel`
--
DROP TABLE IF EXISTS `carrosel`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `carrosel`  AS SELECT `carousel`.`carid` AS `carid`, `carousel`.`carfoto` AS `carfoto`, `carousel`.`carordem` AS `carordem` FROM `carousel``carousel`  ;

-- --------------------------------------------------------

--
-- Structure for view `lista_dias_bloqueados`
--
DROP TABLE IF EXISTS `lista_dias_bloqueados`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_dias_bloqueados`  AS SELECT `bloqueio_de_dia`.`blodinicial` AS `blodinicial`, `bloqueio_de_dia`.`blodfinal` AS `blodfinal` FROM `bloqueio_de_dia``bloqueio_de_dia`  ;

-- --------------------------------------------------------

--
-- Structure for view `lista_precos`
--
DROP TABLE IF EXISTS `lista_precos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_precos`  AS SELECT `precos`.`preid` AS `preid`, `precos`.`prediaria` AS `prediaria`, `precos`.`prediariafds` AS `prediariafds` FROM `precos``precos`  ;

-- --------------------------------------------------------

--
-- Structure for view `lista_promocoes`
--
DROP TABLE IF EXISTS `lista_promocoes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_promocoes`  AS SELECT `promocoes`.`proid` AS `proid`, `promocoes`.`pronome` AS `pronome`, `promocoes`.`prodataini` AS `prodataini`, `promocoes`.`prodatafim` AS `prodatafim`, `promocoes`.`pronpreco` AS `pronpreco`, `promocoes`.`pronprecofds` AS `pronprecofds`, `promocoes`.`proativo` AS `proativo` FROM `promocoes``promocoes`  ;

-- --------------------------------------------------------

--
-- Structure for view `lista_reservas`
--
DROP TABLE IF EXISTS `lista_reservas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_reservas`  AS SELECT `r`.`resid` AS `resid`, `r`.`rescheckin` AS `rescheckin`, `r`.`rescheckout` AS `rescheckout`, `r`.`resvtotal` AS `resvtotal`, `r`.`resstatuspag` AS `resstatuspag`, `u`.`usuid` AS `usuid`, `u`.`usunome` AS `usunome`, `u`.`usutelefone` AS `usutelefone`, `u`.`usuemail` AS `usuemail`, `u`.`usudatanasc` AS `usudatanasc`, `u`.`usufoto` AS `usufoto` FROM (`reservas` `r` join `usuarios` `u` on((`r`.`resusuid` = `u`.`usuid`))) WHERE (`r`.`resstatuspag` = 1)  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bloqueio_de_dia`
--
ALTER TABLE `bloqueio_de_dia`
  ADD PRIMARY KEY (`bloid`);

--
-- Indexes for table `carousel`
--
ALTER TABLE `carousel`
  ADD PRIMARY KEY (`carid`);

--
-- Indexes for table `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`fotid`);

--
-- Indexes for table `itens_sessoes`
--
ALTER TABLE `itens_sessoes`
  ADD PRIMARY KEY (`iteid`),
  ADD KEY `fkitesessao` (`itesessao`),
  ADD KEY `fkiteutilitario` (`iteutilitario`);

--
-- Indexes for table `precos`
--
ALTER TABLE `precos`
  ADD PRIMARY KEY (`preid`);

--
-- Indexes for table `promocoes`
--
ALTER TABLE `promocoes`
  ADD PRIMARY KEY (`proid`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`resid`),
  ADD KEY `fkresusuid` (`resusuid`);

--
-- Indexes for table `sessoes`
--
ALTER TABLE `sessoes`
  ADD PRIMARY KEY (`sesid`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuid`);

--
-- Indexes for table `utilitarios`
--
ALTER TABLE `utilitarios`
  ADD PRIMARY KEY (`utiid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bloqueio_de_dia`
--
ALTER TABLE `bloqueio_de_dia`
  MODIFY `bloid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carousel`
--
ALTER TABLE `carousel`
  MODIFY `carid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fotos`
--
ALTER TABLE `fotos`
  MODIFY `fotid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `itens_sessoes`
--
ALTER TABLE `itens_sessoes`
  MODIFY `iteid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `precos`
--
ALTER TABLE `precos`
  MODIFY `preid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promocoes`
--
ALTER TABLE `promocoes`
  MODIFY `proid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `resid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sessoes`
--
ALTER TABLE `sessoes`
  MODIFY `sesid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `utilitarios`
--
ALTER TABLE `utilitarios`
  MODIFY `utiid` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `itens_sessoes`
--
ALTER TABLE `itens_sessoes`
  ADD CONSTRAINT `fkitesessao` FOREIGN KEY (`itesessao`) REFERENCES `sessoes` (`sesid`),
  ADD CONSTRAINT `fkiteutilitario` FOREIGN KEY (`iteutilitario`) REFERENCES `utilitarios` (`utiid`);

--
-- Constraints for table `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fkrescliid` FOREIGN KEY (`resusuid`) REFERENCES `usuarios` (`usuid`),
  ADD CONSTRAINT `fkresusuid` FOREIGN KEY (`resusuid`) REFERENCES `usuarios` (`usuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
