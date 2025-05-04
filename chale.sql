-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/05/2025 às 04:24
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
-- Estrutura para tabela `bloqueio_de_dia`
--

CREATE TABLE `bloqueio_de_dia` (
  `bloid` int(11) NOT NULL,
  `blodinicial` date DEFAULT NULL,
  `blodfinal` date DEFAULT NULL,
  `blotipo` enum('reserva','manual','airbnb') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `carousel`
--

CREATE TABLE `carousel` (
  `carid` int(11) NOT NULL,
  `carfoto` longblob DEFAULT NULL,
  `carordem` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `carrosel`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `carrosel` (
`carid` int(11)
,`carfoto` longblob
,`carordem` int(11)
);

-- --------------------------------------------------------

--
-- Estrutura para tabela `itens_sessoes`
--

CREATE TABLE `itens_sessoes` (
  `iteid` int(11) NOT NULL,
  `itesessao` int(11) DEFAULT NULL,
  `itefoto` longblob DEFAULT NULL,
  `iteutilitario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `lista_de_reservas`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `lista_de_reservas` (
`resid` int(11)
,`rescheckin` date
,`rescheckout` date
,`resusuid` int(11)
,`resvtotal` double
,`resstatuspag` tinyint(1)
,`resprazopag` datetime
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `lista_dias_bloqueados`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `lista_dias_bloqueados` (
`blodinicial` date
,`blodfinal` date
);

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
-- Estrutura para tabela `precos`
--

CREATE TABLE `precos` (
  `preid` int(11) NOT NULL,
  `prediaria` double DEFAULT NULL,
  `prediariafds` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estrutura para tabela `sessoes`
--

CREATE TABLE `sessoes` (
  `sesid` int(11) NOT NULL,
  `sesnome` varchar(20) DEFAULT NULL,
  `sesreferencia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `ususenha` varchar(20) DEFAULT NULL,
  `usufoto` longblob DEFAULT NULL,
  `usutipo` enum('cliente','admin') DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`usuid`, `usunome`, `usutelefone`, `usuemail`, `usudatanasc`, `ususenha`, `usufoto`, `usutipo`) VALUES
(1, 'Juliana Cardoso Araujo', '(14)99646-7035', 'julianacaraujo3103@gmail.com', '2008-03-31', '12345', '', 'admin');

-- --------------------------------------------------------

--
-- Estrutura para tabela `utilitarios`
--

CREATE TABLE `utilitarios` (
  `utiid` int(11) NOT NULL,
  `utinome` varchar(50) DEFAULT NULL,
  `utifoto` longblob DEFAULT NULL,
  `utidescricao` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para view `carrosel`
--
DROP TABLE IF EXISTS `carrosel`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `carrosel`  AS SELECT `carousel`.`carid` AS `carid`, `carousel`.`carfoto` AS `carfoto`, `carousel`.`carordem` AS `carordem` FROM `carousel` ;

-- --------------------------------------------------------

--
-- Estrutura para view `lista_de_reservas`
--
DROP TABLE IF EXISTS `lista_de_reservas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_de_reservas`  AS SELECT `reservas`.`resid` AS `resid`, `reservas`.`rescheckin` AS `rescheckin`, `reservas`.`rescheckout` AS `rescheckout`, `reservas`.`resusuid` AS `resusuid`, `reservas`.`resvtotal` AS `resvtotal`, `reservas`.`resstatuspag` AS `resstatuspag`, `reservas`.`resprazopag` AS `resprazopag` FROM `reservas` ;

-- --------------------------------------------------------

--
-- Estrutura para view `lista_dias_bloqueados`
--
DROP TABLE IF EXISTS `lista_dias_bloqueados`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_dias_bloqueados`  AS SELECT `bloqueio_de_dia`.`blodinicial` AS `blodinicial`, `bloqueio_de_dia`.`blodfinal` AS `blodfinal` FROM `bloqueio_de_dia` ;

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

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `bloqueio_de_dia`
--
ALTER TABLE `bloqueio_de_dia`
  ADD PRIMARY KEY (`bloid`);

--
-- Índices de tabela `carousel`
--
ALTER TABLE `carousel`
  ADD PRIMARY KEY (`carid`);

--
-- Índices de tabela `itens_sessoes`
--
ALTER TABLE `itens_sessoes`
  ADD PRIMARY KEY (`iteid`),
  ADD KEY `fkitesessao` (`itesessao`),
  ADD KEY `fkiteutilitario` (`iteutilitario`);

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
  ADD KEY `fkresusuid` (`resusuid`);

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
-- Índices de tabela `utilitarios`
--
ALTER TABLE `utilitarios`
  ADD PRIMARY KEY (`utiid`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bloqueio_de_dia`
--
ALTER TABLE `bloqueio_de_dia`
  MODIFY `bloid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `carousel`
--
ALTER TABLE `carousel`
  MODIFY `carid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `itens_sessoes`
--
ALTER TABLE `itens_sessoes`
  MODIFY `iteid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `precos`
--
ALTER TABLE `precos`
  MODIFY `preid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `promocoes`
--
ALTER TABLE `promocoes`
  MODIFY `proid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `reservas`
--
ALTER TABLE `reservas`
  MODIFY `resid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sessoes`
--
ALTER TABLE `sessoes`
  MODIFY `sesid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `utilitarios`
--
ALTER TABLE `utilitarios`
  MODIFY `utiid` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `itens_sessoes`
--
ALTER TABLE `itens_sessoes`
  ADD CONSTRAINT `fkitesessao` FOREIGN KEY (`itesessao`) REFERENCES `sessoes` (`sesid`),
  ADD CONSTRAINT `fkiteutilitario` FOREIGN KEY (`iteutilitario`) REFERENCES `utilitarios` (`utiid`);

--
-- Restrições para tabelas `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fkrescliid` FOREIGN KEY (`resusuid`) REFERENCES `usuarios` (`usuid`),
  ADD CONSTRAINT `fkresusuid` FOREIGN KEY (`resusuid`) REFERENCES `usuarios` (`usuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
