-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2019 a las 19:49:45
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectoipc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `cod_ACTIVIDAD` int(10) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `ponderacion` int(3) NOT NULL,
  `limite` time NOT NULL,
  `fecha` date NOT NULL,
  `archivo` varchar(11) NOT NULL,
  `completa` datetime NOT NULL,
  `fk_cod_ASIGNACION` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`cod_ACTIVIDAD`, `descripcion`, `ponderacion`, `limite`, `fecha`, `archivo`, `completa`, `fk_cod_ASIGNACION`) VALUES
(2, 'Resumen Capacitores', 12, '04:32:00', '2019-10-20', 'false', '0000-00-00 00:00:00', 1),
(6, 'Resumen Dielectrico', 5, '12:34:00', '2019-10-12', 'false', '0000-00-00 00:00:00', 1),
(11, 'Resumen Dielectricos', 10, '04:51:00', '2019-10-20', 'false', '2019-10-20 06:50:00', 1),
(12, 'Resumen Circuitos', 10, '16:41:00', '2019-10-23', 'false', '2019-10-23 16:41:00', 3),
(13, 'Resumen de Campo Electrico', 10, '01:08:00', '2020-04-03', 'false', '2020-04-03 01:08:00', 4),
(14, 'Actvidad de Prueba', 10, '12:00:00', '2020-02-12', 'false', '2020-02-12 12:00:00', 1),
(15, 'Actividad Refrescar', 10, '12:00:00', '2019-12-12', 'false', '2019-12-12 12:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion_actividad`
--

CREATE TABLE `asignacion_actividad` (
  `cod_ANOTA` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `nota` int(11) NOT NULL,
  `fk_cod_USUARIO` int(11) NOT NULL,
  `fk_cod_ACTIVIDAD` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignacion_actividad`
--

INSERT INTO `asignacion_actividad` (`cod_ANOTA`, `contenido`, `nota`, `fk_cod_USUARIO`, `fk_cod_ACTIVIDAD`) VALUES
(2, '', 80, 8, 2),
(3, 'ESTA ES UNA PRUEBA', 10, 6, 11),
(4, '', 30, 1, 6),
(5, '', 40, 8, 6),
(6, '', 25, 6, 6),
(7, 'ESTA ES MI TAREA', 0, 6, 12),
(8, '', 70, 6, 2),
(9, 'Este es mi trabajo :)', 0, 6, 14),
(10, 'Esta es mi respuesta a la actividad', 0, 1, 14),
(12, 'actividad a refrescar?', 0, 1, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion_curso`
--

CREATE TABLE `asignacion_curso` (
  `cod_ASIGNACION` int(10) NOT NULL,
  `semestre` int(1) NOT NULL,
  `seccion` varchar(2) NOT NULL,
  `inicio` time NOT NULL,
  `fin` time NOT NULL,
  `anio` int(11) NOT NULL,
  `fk_cod_CURSO` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignacion_curso`
--

INSERT INTO `asignacion_curso` (`cod_ASIGNACION`, `semestre`, `seccion`, `inicio`, `fin`, `anio`, `fk_cod_CURSO`) VALUES
(1, 2, 'A', '12:00:00', '12:50:00', 2019, 1),
(2, 1, 'B', '09:00:00', '09:50:00', 2019, 2),
(3, 1, 'A', '12:00:00', '12:50:00', 2019, 3),
(4, 2, 'B', '08:00:00', '08:50:00', 2019, 1),
(5, 2, 'D', '09:00:00', '09:50:00', 2018, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion_detalle`
--

CREATE TABLE `asignacion_detalle` (
  `cod_DETALLE` int(11) NOT NULL,
  `nota` int(11) NOT NULL,
  `fk_cod_USUARIO` int(11) NOT NULL,
  `fk_cod_ASIGNACION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignacion_detalle`
--

INSERT INTO `asignacion_detalle` (`cod_DETALLE`, `nota`, `fk_cod_USUARIO`, `fk_cod_ASIGNACION`) VALUES
(11, 0, 6, 1),
(12, 0, 6, 2),
(18, 0, 11, 1),
(20, 0, 8, 1),
(23, 0, 1, 1),
(24, 0, 1, 2),
(25, 0, 11, 4),
(26, 0, 6, 4),
(27, 0, 6, 5),
(28, 0, 14, 2),
(29, 0, 14, 1),
(31, 0, 15, 1),
(34, 0, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion_evaluacion`
--

CREATE TABLE `asignacion_evaluacion` (
  `cod_TEST` int(11) NOT NULL,
  `nota` int(11) NOT NULL,
  `fk_cod_USUARIO` int(11) NOT NULL,
  `fk_cod_EVALUACION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignacion_evaluacion`
--

INSERT INTO `asignacion_evaluacion` (`cod_TEST`, `nota`, `fk_cod_USUARIO`, `fk_cod_EVALUACION`) VALUES
(8, 40, 6, 1),
(9, 100, 6, 2),
(10, 0, 6, 7),
(11, 50, 6, 8),
(12, 20, 14, 1),
(13, 33, 6, 9),
(14, 60, 1, 1),
(19, 0, 1, 7),
(24, 0, 1, 8),
(26, 0, 1, 2),
(27, 67, 1, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion_foro`
--

CREATE TABLE `asignacion_foro` (
  `cod_AFORO` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `fecha` datetime NOT NULL,
  `fk_cod_USUARIO` int(11) NOT NULL,
  `fk_cod_FORO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignacion_foro`
--

INSERT INTO `asignacion_foro` (`cod_AFORO`, `comentario`, `fecha`, `fk_cod_USUARIO`, `fk_cod_FORO`) VALUES
(2, 'esta es otra prueba', '2019-10-21 06:44:00', 11, 1),
(3, 'esta es otraaa prueba', '2019-10-21 06:46:38', 11, 1),
(4, 'si funciona esta cosa?', '2019-10-21 08:10:00', 6, 1),
(5, 'pues aparentemente', '2019-10-21 08:10:32', 11, 1),
(6, 'vamos a probar otra vez', '2019-10-21 08:11:09', 11, 1),
(7, 'hola, esta es otra prueba', '2019-10-21 16:47:23', 6, 1),
(8, 'hola, esta es otra prueba', '2019-10-21 16:48:13', 6, 1),
(9, 'esta es una prueba', '2019-10-22 00:00:23', 11, 2),
(10, 'y esto...funciona?', '2019-10-22 00:01:45', 11, 2),
(11, 'veamos si ahora si', '2019-10-22 00:02:38', 11, 2),
(12, 'veamos si ahora si', '2019-10-22 00:02:38', 11, 2),
(13, 'este es un mensaje del estudiante', '2019-10-22 00:26:03', 6, 7),
(14, 'este es un mensaje del estudiante', '2019-10-22 00:27:56', 6, 2),
(15, 'esto se supone que deberia de funcionar en tiempo real...', '2019-10-22 07:22:53', 6, 1),
(16, 'y pos en efecto, funciona :)', '2019-10-22 07:23:29', 6, 1),
(17, 'a ver otra vez', '2019-10-22 07:25:27', 6, 1),
(18, 'no pos si esta pelado esto', '2019-10-22 07:30:07', 6, 1),
(19, 'este es otro mensaje de prueba', '2019-10-22 14:55:32', 11, 2),
(20, 'Este es un mensaje para el aux', '2019-10-22 14:57:32', 6, 2),
(22, 'otra prieba de foro', '2019-10-22 14:59:20', 6, 1),
(23, 'hola Kenni', '2019-10-23 15:06:39', 11, 1),
(24, 'Hola Jose, bienvenido al curso', '2019-10-25 19:57:38', 6, 7),
(27, 'Cambio de salones para el parcial', '2019-10-26 07:37:21', 11, 2),
(31, 'mensaje para fisica basica B', '2019-10-26 15:40:09', 1, 5),
(32, 'Cambio de fecha de tarea final', '2019-10-26 15:44:19', 11, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion_respuesta`
--

CREATE TABLE `asignacion_respuesta` (
  `cod_RESPUESTA` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `fecha` datetime NOT NULL,
  `fk_cod_USUARIO` int(11) NOT NULL,
  `fk_cod_AFORO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignacion_respuesta`
--

INSERT INTO `asignacion_respuesta` (`cod_RESPUESTA`, `comentario`, `fecha`, `fk_cod_USUARIO`, `fk_cod_AFORO`) VALUES
(1, 'esta es una respuesta', '0000-00-00 00:00:00', 6, 5),
(2, 'aqui me esoy respondiendo a mi mismo XD', '2019-10-21 19:55:03', 6, 7),
(3, 'respondiendome pt.2', '2019-10-21 20:15:22', 6, 7),
(4, 'respondiendo?', '2019-10-21 20:16:06', 6, 4),
(5, 'necesitas ayuda Kevin?', '2019-10-22 01:07:05', 11, 14),
(6, 'pues nada mas viendo como funciona esto', '2019-10-22 01:12:11', 6, 14),
(7, 'qué sera de las respuestas en tiempo real?', '2019-10-22 07:26:58', 6, 17),
(8, 'estoy ansioso de veras', '2019-10-22 14:58:31', 11, 20),
(9, 'respuesta a Kevin 7u7', '2019-10-22 17:02:09', 11, 8),
(10, 'esta es una respueta :)', '2019-10-23 15:06:39', 11, 23),
(11, 'respuesta de prueba', '2019-10-26 15:46:10', 11, 20),
(12, 'De acuerdo :)', '2019-10-26 15:46:59', 11, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `cod_ASISTENCIA` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `fk_cod_USUARIO` int(10) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `fk_cod_ASIGNACION` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`cod_ASISTENCIA`, `fecha`, `fk_cod_USUARIO`, `estado`, `fk_cod_ASIGNACION`) VALUES
(12, '2019-10-22', 1, 'F', 1),
(13, '2019-10-22', 8, 'F', 1),
(14, '2019-10-22', 6, 'F', 1),
(15, '2019-10-23', 6, 'F', 1),
(16, '2019-10-23', 1, 'F', 1),
(17, '2019-10-23', 8, 'F', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `cod_CURSO` int(10) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`cod_CURSO`, `nombre`, `descripcion`) VALUES
(1, '001', 'Fisica Basica'),
(2, '002', 'Fisica 1'),
(3, '003', 'Fisica 2'),
(5, '005', 'IPC 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `cod_EVALUACION` int(10) NOT NULL,
  `titulo` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `aleatorio` varchar(45) NOT NULL,
  `fk_cod_ASIGNACION` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`cod_EVALUACION`, `titulo`, `estado`, `aleatorio`, `fk_cod_ASIGNACION`) VALUES
(1, 'Test de prueba', 'DESHABILITAR', '', 1),
(2, 'Cuestionario', 'DESHABILITAR', '', 1),
(7, 'Trivia', 'DESHABILITAR', '', 1),
(8, 'Corto #1', 'DESHABILITAR', '', 1),
(9, 'Jairo uwu', 'DESHABILITAR', '', 1),
(10, 'Corto #2', 'ACTIVAR', 'N', 1),
(11, 'Corto #3', 'DESHABILITAR', 'A', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foro`
--

CREATE TABLE `foro` (
  `cod_FORO` int(11) NOT NULL,
  `titulo` varchar(45) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` date NOT NULL,
  `limite` time NOT NULL,
  `completa` datetime NOT NULL,
  `fk_cod_ASIGNACION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `foro`
--

INSERT INTO `foro` (`cod_FORO`, `titulo`, `descripcion`, `fecha`, `limite`, `completa`, `fk_cod_ASIGNACION`) VALUES
(1, 'Filosofando ando', 'Este es un espacio para reflexionar sobre nuestra existencia ', '2019-12-12', '12:00:00', '2019-12-12 12:00:00', 1),
(2, '', '', '0000-00-00', '00:00:00', '0000-00-00 00:00:00', 1),
(3, '', '', '0000-00-00', '00:00:00', '0000-00-00 00:00:00', 4),
(5, '', '', '0000-00-00', '00:00:00', '0000-00-00 00:00:00', 2),
(6, '', '', '0000-00-00', '00:00:00', '0000-00-00 00:00:00', 2),
(7, '', '', '0000-00-00', '00:00:00', '0000-00-00 00:00:00', 3),
(8, 'Foro Prueba', 'Foro para comprobar el refrescado en tiempo real', '2019-02-12', '12:00:00', '2019-02-12 12:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `limite`
--

CREATE TABLE `limite` (
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `limite`
--

INSERT INTO `limite` (`fecha`) VALUES
('2019-10-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta_evaluacion`
--

CREATE TABLE `pregunta_evaluacion` (
  `cod_PREGUNTA` int(10) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `fk_cod_EVALUACION` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pregunta_evaluacion`
--

INSERT INTO `pregunta_evaluacion` (`cod_PREGUNTA`, `descripcion`, `estado`, `fk_cod_EVALUACION`) VALUES
(1, 'El nombre del aux es Isaac', 'V', 1),
(2, 'Sale en vacas', 'V', 1),
(3, 'funciona esto?', 'F', 1),
(4, 'ganaras el curso', 'F', 1),
(5, 'esta es la ultima pregunta', 'V', 1),
(6, 'juampa gei', 'V', 2),
(7, 'nelson blanco', 'F', 2),
(8, 'isaac dislexico', 'V', 2),
(9, 'nicole gei x2', 'V', 2),
(10, 'handsome', 'V', 7),
(11, 'voltaje tiene vector', 'F', 8),
(12, 'campo electrico tiene vector', 'V', 8),
(13, 'Mini gei', 'F', 9),
(14, 'Jairo gei', 'V', 9),
(15, 'Tobar gei', 'V', 9),
(16, 'En capacitores serie misma voltaje', 'V', 11),
(17, 'En resistencias serie misma carga', 'V', 11),
(18, 'En dielectricos constante el campo electrico', 'F', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `cod_ROL` int(10) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`cod_ROL`, `descripcion`) VALUES
(1, 'admin'),
(2, 'estudiante'),
(3, 'auxiliar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `cod_TICKET` int(10) NOT NULL,
  `asunto` varchar(45) NOT NULL,
  `contenido` text NOT NULL,
  `estado` varchar(45) NOT NULL,
  `accion` varchar(45) NOT NULL,
  `fk_cod_USUARIO` int(10) NOT NULL,
  `fk_cod_ASIGNACION` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ticket`
--

INSERT INTO `ticket` (`cod_TICKET`, `asunto`, `contenido`, `estado`, `accion`, `fk_cod_USUARIO`, `fk_cod_ASIGNACION`) VALUES
(1, 'PRUEBA', 'PRUEBA', 'FINALIZADO', 'undefined', 6, 1),
(2, 'Falta de material', 'aiuda :(', 'RECIBIDO', '', 6, 2),
(3, 'Ausencia del auxiliar', 'No pudimos recibir lab...', 'FINALIZADO', 'undefined', 6, 1),
(4, 'Sale en vacas', 'Esto esta muy largo y no creo terminarlo', 'FINALIZADO', 'undefined', 6, 1),
(5, 'mala clase', 'el aux no es bueno', 'RECIBIDO', '', 6, 5),
(6, 'Esta es otra prueba', 'sera que esto funciona?', 'FINALIZADO', 'undefined', 6, 1),
(7, 'Por que??????????', ':(((((((((((', 'FINALIZADO', 'si funciona :)', 6, 1),
(8, 'No se como hacer el proyecto ', 'Hay prorroga?', 'FINALIZADO', 'No te preocupes, lo explicaremos en lab :)', 1, 1),
(9, 'Auidaaaaa', 'sale en vacas :(', 'FINALIZADO', 'No te preocupes, sale en semestre', 1, 1),
(10, 'Y....esta es la prueba final', 'Funciona?', 'RECIBIDO', '', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `cod_USUARIO` int(10) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `carne` int(9) NOT NULL,
  `contra` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `fk_cod_ROL` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`cod_USUARIO`, `nombre`, `carne`, `contra`, `correo`, `fk_cod_ROL`) VALUES
(1, 'Fernando', 201801287, 'Password1', 'fernando99@gmail.com', 2),
(2, 'Sofia', 201702837, 'Hola12345', 'sof.morales@gmail.com', 2),
(3, 'Jorge', 201201231, 'Muralles432', 'jorgemuralles@gmail.com', 2),
(6, 'Kevin', 201800512, 'otaku4Ever', 'kevsemp99@gmail.com', 2),
(7, 'Samuel', 202008783, 'Hola4321jd', 'samuel24@gmail.com', 2),
(8, 'Tello', 201800714, 'tellitoT123', 'tellouwu@gmail.com', 2),
(9, 'Isaac', 201806839, 'Semeolvido1', '', 1),
(10, 'Gabriela', 201900170, 'Bities2019', 'gabymorales@gmail.com', 3),
(11, 'Manuel', 201807394, 'Password1', 'manuwu@gmail.com', 3),
(13, 'Nelson', 201800519, 'Wenawena1', 'alefun99@gmail.com', 2),
(14, 'Alex', 201800555, 'Rossmary1', 'alexsosa@gmail.com', 2),
(15, 'Jose', 201807431, 'Jose12345', 'joseuwu@gmail.com', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`cod_ACTIVIDAD`),
  ADD KEY `fk_cod_CURSO` (`fk_cod_ASIGNACION`);

--
-- Indices de la tabla `asignacion_actividad`
--
ALTER TABLE `asignacion_actividad`
  ADD PRIMARY KEY (`cod_ANOTA`),
  ADD KEY `fk_cod_ACTIVIDAD` (`fk_cod_ACTIVIDAD`),
  ADD KEY `asignacion_actividad_ibfk_2` (`fk_cod_USUARIO`);

--
-- Indices de la tabla `asignacion_curso`
--
ALTER TABLE `asignacion_curso`
  ADD PRIMARY KEY (`cod_ASIGNACION`),
  ADD KEY `fk_cod_CUSRO` (`fk_cod_CURSO`);

--
-- Indices de la tabla `asignacion_detalle`
--
ALTER TABLE `asignacion_detalle`
  ADD PRIMARY KEY (`cod_DETALLE`),
  ADD KEY `fk_cod_CURSO` (`fk_cod_ASIGNACION`),
  ADD KEY `fk_cod_USUARIO` (`fk_cod_USUARIO`);

--
-- Indices de la tabla `asignacion_evaluacion`
--
ALTER TABLE `asignacion_evaluacion`
  ADD PRIMARY KEY (`cod_TEST`),
  ADD KEY `fk_cod_EVALUACION` (`fk_cod_EVALUACION`),
  ADD KEY `fk_cod_USUARIO` (`fk_cod_USUARIO`);

--
-- Indices de la tabla `asignacion_foro`
--
ALTER TABLE `asignacion_foro`
  ADD PRIMARY KEY (`cod_AFORO`),
  ADD KEY `fk_cod_FORO` (`fk_cod_FORO`),
  ADD KEY `fk_cod_USUARIO` (`fk_cod_USUARIO`);

--
-- Indices de la tabla `asignacion_respuesta`
--
ALTER TABLE `asignacion_respuesta`
  ADD PRIMARY KEY (`cod_RESPUESTA`),
  ADD KEY `fk_cod_AFORO` (`fk_cod_AFORO`),
  ADD KEY `fk_cod_USUARIO` (`fk_cod_USUARIO`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`cod_ASISTENCIA`),
  ADD KEY `fk_cod_CURSO` (`fk_cod_ASIGNACION`),
  ADD KEY `fk_cod_USUARIO` (`fk_cod_USUARIO`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`cod_CURSO`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`cod_EVALUACION`),
  ADD KEY `fk_cod_CURSO` (`fk_cod_ASIGNACION`),
  ADD KEY `fk_cod_TIPO_EVALUACION` (`estado`);

--
-- Indices de la tabla `foro`
--
ALTER TABLE `foro`
  ADD PRIMARY KEY (`cod_FORO`),
  ADD KEY `fk_cod_ASIGNACION` (`fk_cod_ASIGNACION`);

--
-- Indices de la tabla `pregunta_evaluacion`
--
ALTER TABLE `pregunta_evaluacion`
  ADD PRIMARY KEY (`cod_PREGUNTA`),
  ADD KEY `fk_EVALUACION` (`fk_cod_EVALUACION`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`cod_ROL`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`cod_TICKET`),
  ADD KEY `fk_cod_SALA` (`fk_cod_ASIGNACION`),
  ADD KEY `fk_cod_USUARIO` (`fk_cod_USUARIO`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`cod_USUARIO`),
  ADD KEY `fk_cod_ROL` (`fk_cod_ROL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `cod_ACTIVIDAD` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `asignacion_actividad`
--
ALTER TABLE `asignacion_actividad`
  MODIFY `cod_ANOTA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `asignacion_curso`
--
ALTER TABLE `asignacion_curso`
  MODIFY `cod_ASIGNACION` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT de la tabla `asignacion_detalle`
--
ALTER TABLE `asignacion_detalle`
  MODIFY `cod_DETALLE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT de la tabla `asignacion_evaluacion`
--
ALTER TABLE `asignacion_evaluacion`
  MODIFY `cod_TEST` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT de la tabla `asignacion_foro`
--
ALTER TABLE `asignacion_foro`
  MODIFY `cod_AFORO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT de la tabla `asignacion_respuesta`
--
ALTER TABLE `asignacion_respuesta`
  MODIFY `cod_RESPUESTA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `cod_ASISTENCIA` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `cod_CURSO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `cod_EVALUACION` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `foro`
--
ALTER TABLE `foro`
  MODIFY `cod_FORO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `pregunta_evaluacion`
--
ALTER TABLE `pregunta_evaluacion`
  MODIFY `cod_PREGUNTA` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `cod_ROL` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `cod_TICKET` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `cod_USUARIO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`fk_cod_ASIGNACION`) REFERENCES `asignacion_curso` (`cod_ASIGNACION`);

--
-- Filtros para la tabla `asignacion_actividad`
--
ALTER TABLE `asignacion_actividad`
  ADD CONSTRAINT `asignacion_actividad_ibfk_1` FOREIGN KEY (`fk_cod_ACTIVIDAD`) REFERENCES `actividad` (`cod_ACTIVIDAD`),
  ADD CONSTRAINT `asignacion_actividad_ibfk_2` FOREIGN KEY (`fk_cod_USUARIO`) REFERENCES `usuario` (`cod_USUARIO`);

--
-- Filtros para la tabla `asignacion_curso`
--
ALTER TABLE `asignacion_curso`
  ADD CONSTRAINT `asignacion_curso_ibfk_2` FOREIGN KEY (`fk_cod_CURSO`) REFERENCES `curso` (`cod_CURSO`) ON DELETE CASCADE;

--
-- Filtros para la tabla `asignacion_detalle`
--
ALTER TABLE `asignacion_detalle`
  ADD CONSTRAINT `asignacion_detalle_ibfk_1` FOREIGN KEY (`fk_cod_ASIGNACION`) REFERENCES `asignacion_curso` (`cod_ASIGNACION`),
  ADD CONSTRAINT `asignacion_detalle_ibfk_2` FOREIGN KEY (`fk_cod_USUARIO`) REFERENCES `usuario` (`cod_USUARIO`);

--
-- Filtros para la tabla `asignacion_evaluacion`
--
ALTER TABLE `asignacion_evaluacion`
  ADD CONSTRAINT `asignacion_evaluacion_ibfk_1` FOREIGN KEY (`fk_cod_EVALUACION`) REFERENCES `evaluacion` (`cod_EVALUACION`),
  ADD CONSTRAINT `asignacion_evaluacion_ibfk_2` FOREIGN KEY (`fk_cod_USUARIO`) REFERENCES `usuario` (`cod_USUARIO`);

--
-- Filtros para la tabla `asignacion_foro`
--
ALTER TABLE `asignacion_foro`
  ADD CONSTRAINT `asignacion_foro_ibfk_1` FOREIGN KEY (`fk_cod_FORO`) REFERENCES `foro` (`cod_FORO`),
  ADD CONSTRAINT `asignacion_foro_ibfk_2` FOREIGN KEY (`fk_cod_USUARIO`) REFERENCES `usuario` (`cod_USUARIO`);

--
-- Filtros para la tabla `asignacion_respuesta`
--
ALTER TABLE `asignacion_respuesta`
  ADD CONSTRAINT `asignacion_respuesta_ibfk_1` FOREIGN KEY (`fk_cod_AFORO`) REFERENCES `asignacion_foro` (`cod_AFORO`),
  ADD CONSTRAINT `asignacion_respuesta_ibfk_2` FOREIGN KEY (`fk_cod_USUARIO`) REFERENCES `usuario` (`cod_USUARIO`);

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`fk_cod_ASIGNACION`) REFERENCES `asignacion_curso` (`cod_ASIGNACION`),
  ADD CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`fk_cod_USUARIO`) REFERENCES `usuario` (`cod_USUARIO`);

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `evaluacion_ibfk_1` FOREIGN KEY (`fk_cod_ASIGNACION`) REFERENCES `asignacion_curso` (`cod_ASIGNACION`);

--
-- Filtros para la tabla `foro`
--
ALTER TABLE `foro`
  ADD CONSTRAINT `foro_ibfk_1` FOREIGN KEY (`fk_cod_ASIGNACION`) REFERENCES `asignacion_curso` (`cod_ASIGNACION`);

--
-- Filtros para la tabla `pregunta_evaluacion`
--
ALTER TABLE `pregunta_evaluacion`
  ADD CONSTRAINT `pregunta_evaluacion_ibfk_1` FOREIGN KEY (`fk_cod_EVALUACION`) REFERENCES `evaluacion` (`cod_EVALUACION`);

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`fk_cod_ASIGNACION`) REFERENCES `asignacion_curso` (`cod_ASIGNACION`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`fk_cod_USUARIO`) REFERENCES `usuario` (`cod_USUARIO`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`fk_cod_ROL`) REFERENCES `rol` (`cod_ROL`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
