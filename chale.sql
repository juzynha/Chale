-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 23, 2025 at 01:27 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_admin` (IN `nome` VARCHAR(150), IN `email` VARCHAR(100), IN `senha` VARCHAR(255))   BEGIN
    INSERT INTO usuarios (usunome, usuemail, ususenha, usutipo)
    values (nome, email, senha, 'admin');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_foto_carrossel` (IN `foto` VARCHAR(100), IN `posicao` INT)   BEGIN
    INSERT INTO carrossel (carfotcaminho, carposicao)
    VALUES (foto, posicao);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_foto_galeria` (IN `foto` VARCHAR(100), IN `sessao` INT)   BEGIN
    INSERT INTO fotos (fotcaminho, fotsesid)
    VALUES (foto, sessao);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_promocao` (IN `nome` VARCHAR(100), IN `datainicio` DATE, IN `datafim` DATE, IN `preco` DOUBLE, IN `precofds` DOUBLE)   BEGIN
    INSERT INTO promocoes(pronome, prodataini, prodatafim, pronpreco, pronprecofds)
    VALUES (nome, datainicio, datafim, preco, precofds);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_reserva` (IN `checkin` DATE, IN `checkout` DATE, IN `usuid` INT, IN `vtotal` DOUBLE)   BEGIN
    INSERT INTO reservas (
        rescheckin,
        rescheckout,
        resusuid,
        resvtotal,
        resstatuspag,
        resprazopag
    ) VALUES (
        checkin,
        checkout,
        usuid,
        vtotal,
        0,
        DATE_ADD(NOW(), INTERVAL 30 MINUTE) 
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_servico` (IN `nome` VARCHAR(50), `foto` VARCHAR(60), `descricao` TEXT, `sessao` INT)   BEGIN
    INSERT INTO servicos (sernome,serfotcaminho,serdescricao,sersesid)
    VALUES (nome,foto,descricao,sessao);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_sessao` (IN `nome` VARCHAR(50), IN `referencia` VARCHAR(15))   BEGIN
    INSERT INTO sessoes(sesnome, sesreferencia)
    VALUES (nome, referencia);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastrar_usuario` (IN `nome` VARCHAR(150), IN `telefone` VARCHAR(20), IN `email` VARCHAR(100), IN `datanasc` DATE, IN `senha` VARCHAR(255))   BEGIN
    INSERT INTO usuarios (usunome, usutelefone, usuemail, usudatanasc, ususenha, usutipo)
    values (nome, telefone, email, datanasc, senha, 'cliente');
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
-- Table structure for table `bloqueio_dia`
--

CREATE TABLE `bloqueio_dia` (
  `bloid` int NOT NULL,
  `blodinicial` date DEFAULT NULL,
  `blodfinal` date DEFAULT NULL,
  `blotipo` enum('reserva','manual','airbnb') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bloqresid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carrossel`
--

CREATE TABLE `carrossel` (
  `carid` int NOT NULL,
  `carfotcaminho` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `carposicao` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fotos`
--

CREATE TABLE `fotos` (
  `fotid` int NOT NULL,
  `fotcaminho` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fotsesid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `lista_precos`
-- (See below for the actual view)
--
CREATE TABLE `lista_precos` (
`prediaria` double
,`prediariafds` double
,`preid` int
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `lista_promocoes`
-- (See below for the actual view)
--
CREATE TABLE `lista_promocoes` (
`proativo` tinyint(1)
,`prodatafim` date
,`prodataini` date
,`proid` int
,`pronome` varchar(100)
,`pronpreco` double
,`pronprecofds` double
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `lista_reservas`
-- (See below for the actual view)
--
CREATE TABLE `lista_reservas` (
`rescheckin` date
,`rescheckout` date
,`resid` int
,`resstatuspag` tinyint(1)
,`resvtotal` double
,`usudatanasc` date
,`usuemail` varchar(100)
,`usufotcaminho` varchar(100)
,`usuid` int
,`usuidade` bigint
,`usunome` varchar(150)
,`usutelefone` varchar(20)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `lista_sessoes_servicos`
-- (See below for the actual view)
--
CREATE TABLE `lista_sessoes_servicos` (
`sesid` int
,`sesnome` varchar(50)
,`sesreferencia` enum('fotos','servicos')
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

--
-- Dumping data for table `precos`
--

INSERT INTO `precos` (`preid`, `prediaria`, `prediariafds`) VALUES
(1, 150.5, 200);

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

--
-- Dumping data for table `promocoes`
--

INSERT INTO `promocoes` (`proid`, `pronome`, `prodataini`, `prodatafim`, `pronpreco`, `pronprecofds`, `proativo`) VALUES
(1, 'Promoção de Natal', '2025-07-21', '2025-07-25', 400, 450, 1),
(2, 'Promoção', '2025-07-26', '2025-08-15', 123, 123, 1),
(3, 'Promoção de Carnaval', '2026-03-15', '2026-03-16', 300, 500, 1);

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
(1, '2025-05-03', '2025-05-04', 2, 500, 1, '0000-00-00 00:00:00'),
(2, '2025-05-04', '2025-06-04', 2, 220, 1, '2025-05-04 02:49:13'),
(3, '2025-07-18', '2025-07-19', 2, 600, 1, '2025-07-18 05:00:00'),
(4, '2025-07-18', '2025-07-19', 2, 600, 1, '2025-07-18 05:00:00'),
(5, '2025-07-18', '2025-07-19', 1, 600, 1, '2025-07-18 05:00:00'),
(6, '2025-07-18', '2025-07-19', 1, 600, 1, '2025-07-18 05:00:00'),
(7, '2025-07-18', '2025-07-19', 1, 600, 1, '2025-07-18 05:00:00'),
(8, '2025-07-18', '2025-07-19', 1, 600, 1, '2025-07-18 05:00:00'),
(9, '2025-07-18', '2025-07-19', 1, 600, 1, '2025-07-18 05:00:00'),
(10, '2025-07-18', '2025-07-19', 1, 600, 1, '2025-07-18 05:00:00'),
(11, '2025-07-18', '2025-07-19', 1, 600, 1, '2025-07-18 05:00:00'),
(12, '2025-07-18', '2025-07-19', 1, 600, 1, '2025-07-18 05:00:00'),
(13, NULL, NULL, NULL, NULL, 0, '2025-08-18 19:28:13');

-- --------------------------------------------------------

--
-- Table structure for table `servicos`
--

CREATE TABLE `servicos` (
  `serid` int NOT NULL,
  `sernome` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `serfotcaminho` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `serdescricao` text COLLATE utf8mb4_general_ci,
  `sersesid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessoes`
--

CREATE TABLE `sessoes` (
  `sesid` int NOT NULL,
  `sesnome` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sesreferencia` enum('fotos','servicos') COLLATE utf8mb4_general_ci DEFAULT NULL
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
  `ususenha` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usufotcaminho` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usutipo` enum('cliente','admin') COLLATE utf8mb4_general_ci DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usuid`, `usunome`, `usutelefone`, `usuemail`, `usudatanasc`, `ususenha`, `usufotcaminho`, `usutipo`) VALUES
(1, 'Juliana Cardoso Araujo', '(14)99646-7035', 'ju@gmail.com', '2008-03-31', '12345', 'foto.png', 'cliente'),
(2, 'Gabriel Cardoso', '111929389', 'gabriel@gmail.com', '1999-11-04', '123', NULL, 'cliente'),
(28, 'Juliana Cardoso Araujo', NULL, 'julianacaraujo3103@gmail.com', NULL, '$2y$10$dgkHfT0xjEEtRAXqC8TUG.7Bbvf0y/rnu3RdNxT8/ewumx2CTh1lq', NULL, 'admin'),
(34, 'Juliana Cardoso Araujo', '14996467035', 'julianacaraujo@gmail.com', '2007-03-31', '$2y$10$z2Mzj60XGOXgTto1ow7gCeIVMA3Uo/9s1lC9WKuxW1Woh3LqU1VWG', NULL, 'cliente');

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

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_reservas`  AS SELECT `r`.`resid` AS `resid`, `r`.`rescheckin` AS `rescheckin`, `r`.`rescheckout` AS `rescheckout`, `r`.`resvtotal` AS `resvtotal`, `r`.`resstatuspag` AS `resstatuspag`, `u`.`usuid` AS `usuid`, `u`.`usunome` AS `usunome`, `u`.`usutelefone` AS `usutelefone`, `u`.`usuemail` AS `usuemail`, `u`.`usudatanasc` AS `usudatanasc`, timestampdiff(YEAR,`u`.`usudatanasc`,curdate()) AS `usuidade`, `u`.`usufotcaminho` AS `usufotcaminho` FROM (`reservas` `r` join `usuarios` `u` on((`r`.`resusuid` = `u`.`usuid`))) WHERE (`r`.`resstatuspag` = 1)  ;

-- --------------------------------------------------------

--
-- Structure for view `lista_sessoes_servicos`
--
DROP TABLE IF EXISTS `lista_sessoes_servicos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_sessoes_servicos`  AS SELECT `sessoes`.`sesid` AS `sesid`, `sessoes`.`sesnome` AS `sesnome`, `sessoes`.`sesreferencia` AS `sesreferencia` FROM `sessoes` WHERE (`sessoes`.`sesreferencia` = 'servicos')  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bloqueio_dia`
--
ALTER TABLE `bloqueio_dia`
  ADD PRIMARY KEY (`bloid`),
  ADD KEY `fk_bloqueio_reserva` (`bloqresid`);

--
-- Indexes for table `carrossel`
--
ALTER TABLE `carrossel`
  ADD PRIMARY KEY (`carid`),
  ADD UNIQUE KEY `carordem` (`carposicao`);

--
-- Indexes for table `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`fotid`),
  ADD KEY `fk_fotos_sessoes` (`fotsesid`);

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
  ADD KEY `fk_reservas_usuarios` (`resusuid`);

--
-- Indexes for table `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`serid`),
  ADD KEY `fk_servicos_sessoes` (`sersesid`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bloqueio_dia`
--
ALTER TABLE `bloqueio_dia`
  MODIFY `bloid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `carrossel`
--
ALTER TABLE `carrossel`
  MODIFY `carid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `fotos`
--
ALTER TABLE `fotos`
  MODIFY `fotid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `precos`
--
ALTER TABLE `precos`
  MODIFY `preid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promocoes`
--
ALTER TABLE `promocoes`
  MODIFY `proid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `resid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `servicos`
--
ALTER TABLE `servicos`
  MODIFY `serid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sessoes`
--
ALTER TABLE `sessoes`
  MODIFY `sesid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bloqueio_dia`
--
ALTER TABLE `bloqueio_dia`
  ADD CONSTRAINT `fk_bloqueio_reserva` FOREIGN KEY (`bloqresid`) REFERENCES `reservas` (`resid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fk_fotos_sessoes` FOREIGN KEY (`fotsesid`) REFERENCES `sessoes` (`sesid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_reservas_usuarios` FOREIGN KEY (`resusuid`) REFERENCES `usuarios` (`usuid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `servicos`
--
ALTER TABLE `servicos`
  ADD CONSTRAINT `fk_servicos_sessoes` FOREIGN KEY (`sersesid`) REFERENCES `sessoes` (`sesid`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
