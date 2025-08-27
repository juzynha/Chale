-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/08/2025 às 18:53
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `chale`
--

DELIMITER $$
--
-- Procedimentos
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
-- Estrutura para tabela `bloqueio_dia`
--

CREATE TABLE `bloqueio_dia` (
  `bloid` int(11) NOT NULL,
  `blodinicial` date DEFAULT NULL,
  `blodfinal` date DEFAULT NULL,
  `blotipo` enum('reserva','manual','airbnb') DEFAULT NULL,
  `bloqresid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `bloqueio_dia`
--

INSERT INTO `bloqueio_dia` (`bloid`, `blodinicial`, `blodfinal`, `blotipo`, `bloqresid`) VALUES
(1, '2025-08-15', '2025-08-16', '', NULL),
(2, '2025-08-15', '2025-08-26', '', NULL),
(3, '2025-08-15', '2025-08-16', '', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `carrossel`
--

CREATE TABLE `carrossel` (
  `carid` int(11) NOT NULL,
  `carfotcaminho` varchar(100) DEFAULT NULL,
  `carposicao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `carrossel`
--

INSERT INTO `carrossel` (`carid`, `carfotcaminho`, `carposicao`) VALUES
(1, 'foto1.jpeg', 1),
(2, 'foto.jpeg', 2),
(3, 'foto.png', 3),
(4, '6895182eb0925-1334870.png', 4),
(5, '689518772b3aa-1343093.png', 5),
(6, '68951b7dbe309-1123013.jpg', 6),
(7, '68951b9979062-1334869.png', 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `fotos`
--

CREATE TABLE `fotos` (
  `fotid` int(11) NOT NULL,
  `fotcaminho` varchar(100) DEFAULT NULL,
  `fotsesid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fotos`
--

INSERT INTO `fotos` (`fotid`, `fotcaminho`, `fotsesid`) VALUES
(1, '6894f407e6d83-1334869.png', 9),
(2, '6894f4d3d44b5-1334869.png', 9);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `lista_precos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `lista_precos` (
`preid` int(11)
,`prediaria` double
,`prediariafds` double
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `lista_promocoes`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `lista_promocoes` (
`proid` int(11)
,`pronome` varchar(100)
,`prodataini` date
,`prodatafim` date
,`pronpreco` double
,`pronprecofds` double
,`proativo` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `lista_reservas`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `lista_reservas` (
`resid` int(11)
,`rescheckin` date
,`rescheckout` date
,`resvtotal` double
,`resstatuspag` tinyint(1)
,`usuid` int(11)
,`usunome` varchar(150)
,`usutelefone` varchar(20)
,`usuemail` varchar(100)
,`usudatanasc` date
,`usuidade` bigint(21)
,`usufotcaminho` varchar(100)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `lista_sessoes_servicos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `lista_sessoes_servicos` (
`sesid` int(11)
,`sesnome` varchar(50)
,`sesreferencia` enum('fotos','servicos')
);

-- --------------------------------------------------------

--
-- Estrutura para tabela `precos`
--

CREATE TABLE `precos` (
  `preid` int(11) NOT NULL,
  `prediaria` double DEFAULT NULL,
  `prediariafds` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `precos`
--

INSERT INTO `precos` (`preid`, `prediaria`, `prediariafds`) VALUES
(1, 150.5, 200);

-- --------------------------------------------------------

--
-- Estrutura para tabela `promocoes`
--

CREATE TABLE `promocoes` (
  `proid` int(11) NOT NULL,
  `pronome` varchar(100) DEFAULT NULL,
  `prodataini` date DEFAULT NULL,
  `prodatafim` date DEFAULT NULL,
  `pronpreco` double DEFAULT NULL,
  `pronprecofds` double DEFAULT NULL,
  `proativo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `promocoes`
--

INSERT INTO `promocoes` (`proid`, `pronome`, `prodataini`, `prodatafim`, `pronpreco`, `pronprecofds`, `proativo`) VALUES
(1, 'Promoção de Natal', '2025-07-21', '2025-07-25', 400, 450, 1),
(2, 'Promoção', '2025-07-26', '2025-08-15', 123, 123, 1),
(3, 'Promoção de Carnaval', '2026-03-15', '2026-03-16', 300, 500, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `reservas`
--

CREATE TABLE `reservas` (
  `resid` int(11) NOT NULL,
  `rescheckin` date DEFAULT NULL,
  `rescheckout` date DEFAULT NULL,
  `resusuid` int(11) DEFAULT NULL,
  `resvtotal` double DEFAULT NULL,
  `resstatuspag` tinyint(1) DEFAULT 0,
  `resprazopag` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `reservas`
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
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `serid` int(11) NOT NULL,
  `sernome` varchar(25) DEFAULT NULL,
  `serfotcaminho` varchar(100) DEFAULT NULL,
  `serdescricao` text DEFAULT NULL,
  `sersesid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `servicos`
--

INSERT INTO `servicos` (`serid`, `sernome`, `serfotcaminho`, `serdescricao`, `sersesid`) VALUES
(2, 'Ar-condicionado', '6894e205d3de6-1334869.png', 'aaaaa', 9);

-- --------------------------------------------------------

--
-- Estrutura para tabela `sessoes`
--

CREATE TABLE `sessoes` (
  `sesid` int(11) NOT NULL,
  `sesnome` varchar(50) DEFAULT NULL,
  `sesreferencia` enum('fotos','servicos') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `sessoes`
--

INSERT INTO `sessoes` (`sesid`, `sesnome`, `sesreferencia`) VALUES
(9, 'Cozinha', 'fotos'),
(11, 'Cozinha', 'fotos'),
(12, 'Cozinha', ''),
(13, 'Cozinha', ''),
(14, 'Area de', 'fotos'),
(15, 'Sessão', 'fotos'),
(16, 'Sessão', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `usuid` int(11) NOT NULL,
  `usunome` varchar(150) DEFAULT NULL,
  `usutelefone` varchar(20) DEFAULT NULL,
  `usuemail` varchar(100) DEFAULT NULL,
  `usudatanasc` date DEFAULT NULL,
  `ususenha` varchar(255) DEFAULT NULL,
  `usufotcaminho` varchar(100) DEFAULT NULL,
  `usutipo` enum('cliente','admin') DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`usuid`, `usunome`, `usutelefone`, `usuemail`, `usudatanasc`, `ususenha`, `usufotcaminho`, `usutipo`) VALUES
(1, 'Juliana Cardoso Araujo', '(14)99646-7035', 'ju@gmail.com', '2008-03-31', '12345', 'foto.png', 'cliente'),
(2, 'Gabriel Cardoso', '111929389', 'gabriel@gmail.com', '1999-11-04', '123', NULL, 'cliente'),
(28, 'Juliana Cardoso Araujo', NULL, 'julianacaraujo3103@gmail.com', NULL, '$2y$10$dgkHfT0xjEEtRAXqC8TUG.7Bbvf0y/rnu3RdNxT8/ewumx2CTh1lq', NULL, 'admin'),
(34, 'Juliana Cardoso Araujo', '14996467035', 'julianacaraujo@gmail.com', '2007-03-31', '$2y$10$z2Mzj60XGOXgTto1ow7gCeIVMA3Uo/9s1lC9WKuxW1Woh3LqU1VWG', NULL, 'cliente');

-- --------------------------------------------------------

--
-- Estrutura para view `lista_precos`
--
DROP TABLE IF EXISTS `lista_precos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_precos`  AS SELECT `precos`.`preid` AS `preid`, `precos`.`prediaria` AS `prediaria`, `precos`.`prediariafds` AS `prediariafds` FROM `precos` ;

-- --------------------------------------------------------

--
-- Estrutura para view `lista_promocoes`
--
DROP TABLE IF EXISTS `lista_promocoes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_promocoes`  AS SELECT `promocoes`.`proid` AS `proid`, `promocoes`.`pronome` AS `pronome`, `promocoes`.`prodataini` AS `prodataini`, `promocoes`.`prodatafim` AS `prodatafim`, `promocoes`.`pronpreco` AS `pronpreco`, `promocoes`.`pronprecofds` AS `pronprecofds`, `promocoes`.`proativo` AS `proativo` FROM `promocoes` ;

-- --------------------------------------------------------

--
-- Estrutura para view `lista_reservas`
--
DROP TABLE IF EXISTS `lista_reservas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_reservas`  AS SELECT `r`.`resid` AS `resid`, `r`.`rescheckin` AS `rescheckin`, `r`.`rescheckout` AS `rescheckout`, `r`.`resvtotal` AS `resvtotal`, `r`.`resstatuspag` AS `resstatuspag`, `u`.`usuid` AS `usuid`, `u`.`usunome` AS `usunome`, `u`.`usutelefone` AS `usutelefone`, `u`.`usuemail` AS `usuemail`, `u`.`usudatanasc` AS `usudatanasc`, timestampdiff(YEAR,`u`.`usudatanasc`,curdate()) AS `usuidade`, `u`.`usufotcaminho` AS `usufotcaminho` FROM (`reservas` `r` join `usuarios` `u` on(`r`.`resusuid` = `u`.`usuid`)) WHERE `r`.`resstatuspag` = 1 ;

-- --------------------------------------------------------

--
-- Estrutura para view `lista_sessoes_servicos`
--
DROP TABLE IF EXISTS `lista_sessoes_servicos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_sessoes_servicos`  AS SELECT `sessoes`.`sesid` AS `sesid`, `sessoes`.`sesnome` AS `sesnome`, `sessoes`.`sesreferencia` AS `sesreferencia` FROM `sessoes` WHERE `sessoes`.`sesreferencia` = 'servicos' ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `bloqueio_dia`
--
ALTER TABLE `bloqueio_dia`
  ADD PRIMARY KEY (`bloid`),
  ADD KEY `fk_bloqueio_reserva` (`bloqresid`);

--
-- Índices de tabela `carrossel`
--
ALTER TABLE `carrossel`
  ADD PRIMARY KEY (`carid`),
  ADD UNIQUE KEY `carordem` (`carposicao`);

--
-- Índices de tabela `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`fotid`),
  ADD KEY `fk_fotos_sessoes` (`fotsesid`);

--
-- Índices de tabela `precos`
--
ALTER TABLE `precos`
  ADD PRIMARY KEY (`preid`);

--
-- Índices de tabela `promocoes`
--
ALTER TABLE `promocoes`
  ADD PRIMARY KEY (`proid`);

--
-- Índices de tabela `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`resid`),
  ADD KEY `fk_reservas_usuarios` (`resusuid`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`serid`),
  ADD KEY `fk_servicos_sessoes` (`sersesid`);

--
-- Índices de tabela `sessoes`
--
ALTER TABLE `sessoes`
  ADD PRIMARY KEY (`sesid`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuid`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bloqueio_dia`
--
ALTER TABLE `bloqueio_dia`
  MODIFY `bloid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `carrossel`
--
ALTER TABLE `carrossel`
  MODIFY `carid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `fotos`
--
ALTER TABLE `fotos`
  MODIFY `fotid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `precos`
--
ALTER TABLE `precos`
  MODIFY `preid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `promocoes`
--
ALTER TABLE `promocoes`
  MODIFY `proid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `reservas`
--
ALTER TABLE `reservas`
  MODIFY `resid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `serid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `sessoes`
--
ALTER TABLE `sessoes`
  MODIFY `sesid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `bloqueio_dia`
--
ALTER TABLE `bloqueio_dia`
  ADD CONSTRAINT `fk_bloqueio_reserva` FOREIGN KEY (`bloqresid`) REFERENCES `reservas` (`resid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restrições para tabelas `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fk_fotos_sessoes` FOREIGN KEY (`fotsesid`) REFERENCES `sessoes` (`sesid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restrições para tabelas `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_reservas_usuarios` FOREIGN KEY (`resusuid`) REFERENCES `usuarios` (`usuid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restrições para tabelas `servicos`
--
ALTER TABLE `servicos`
  ADD CONSTRAINT `fk_servicos_sessoes` FOREIGN KEY (`sersesid`) REFERENCES `sessoes` (`sesid`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
