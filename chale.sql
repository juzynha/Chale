-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/04/2025 às 19:06
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
  MODIFY `usuid` int(11) NOT NULL AUTO_INCREMENT;

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
