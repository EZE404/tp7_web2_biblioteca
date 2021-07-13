-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 10-07-2021 a las 06:21:28
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

DROP TABLE IF EXISTS `autor`;
CREATE TABLE IF NOT EXISTS `autor` (
  `dni` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `biografia` varchar(2000) COLLATE utf8_spanish_ci NOT NULL,
  `mail` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `foto` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `autor`
--

INSERT INTO `autor` (`dni`, `nombre`, `biografia`, `mail`, `foto`) VALUES
(20444555, 'con biografia', 'esta es la biografía de nadie', 'nadie@correo.com', 'img/20444555.jpeg'),
(30377673, 'mario', 'biografía de mario', 'mario@gmail.com', 'https://images.pexels.com/photos/4501084/pexels-photo-4501084.jpeg'),
(31356158, 'belen', 'biografía de belén', 'belen@gmail.com', 'https://images.pexels.com/photos/6795513/pexels-photo-6795513.jpeg'),
(31356168, 'Genaro', 'biografía de genaro', 'genaro@gmail.com', 'https://images.pexels.com/photos/4258606/pexels-photo-4258606.jpeg'),
(36227970, 'ezequiel albornoz', 'biografía de eze', 'eze@email.com', 'img/36227970.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

DROP TABLE IF EXISTS `libro`;
CREATE TABLE IF NOT EXISTS `libro` (
  `isbn` int(9) NOT NULL,
  `titulo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `año` int(11) NOT NULL,
  `paginas` int(11) NOT NULL,
  `genero` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`isbn`, `titulo`, `descripcion`, `año`, `paginas`, `genero`) VALUES
(222333555, 'en el teclado', 'asdasd', 2021, 10, 'Terror'),
(777888999, 'despues de ti', 'libro que cuenta la historia', 1998, 100, 'Romance'),
(888999777, 'quien podra amarte', 'libro que hablaaaa', 2000, 150, 'Comedia'),
(999888666, 'caimos en el????', 'a su cena', 2010, 50, 'Comedia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro-autor`
--

DROP TABLE IF EXISTS `libro-autor`;
CREATE TABLE IF NOT EXISTS `libro-autor` (
  `dni_autor` int(11) NOT NULL,
  `isbn_libro` int(11) NOT NULL,
  `participacion` int(11) NOT NULL,
  PRIMARY KEY (`dni_autor`,`isbn_libro`),
  KEY `FK_libro` (`isbn_libro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `libro-autor`
--

INSERT INTO `libro-autor` (`dni_autor`, `isbn_libro`, `participacion`) VALUES
(30377673, 222333555, 30),
(30377673, 888999777, 30),
(31356158, 888999777, 20),
(31356158, 999888666, 10),
(31356168, 222333555, 20),
(31356168, 888999777, 50);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libro-autor`
--
ALTER TABLE `libro-autor`
  ADD CONSTRAINT `FK_autor` FOREIGN KEY (`dni_autor`) REFERENCES `autor` (`dni`),
  ADD CONSTRAINT `FK_libro` FOREIGN KEY (`isbn_libro`) REFERENCES `libro` (`isbn`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
