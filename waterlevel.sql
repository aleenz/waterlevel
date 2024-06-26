-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2024 at 05:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waterlevel`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `createLog` (IN `p_serial` VARCHAR(255), IN `p_distance` INT, IN `p_percentage` INT)   BEGIN
    DECLARE device_id INT;

    -- Find the device id based on the provided serial
    SELECT id INTO device_id FROM device WHERE serial = p_serial;


-- Insert a new log into the device_log table
    INSERT INTO device_log (device, percentage)
    VALUES (device_id, p_percentage );

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateDistance` (IN `p_serial` VARCHAR(255), IN `p_distance` FLOAT, IN `p_percentage` FLOAT)   BEGIN
    DECLARE device_id INT;

    -- Find the device id based on the provided serial
    SELECT id INTO device_id FROM device WHERE serial = p_serial;

    -- Update the distance and percentage in the device_info table
    UPDATE device_info
    SET distance = p_distance,
        percentage = p_percentage
    WHERE device = device_id;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `id` int(11) NOT NULL,
  `serial` varchar(10) NOT NULL,
  `height` float DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '0=new,1=registered',
  `user` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`id`, `serial`, `height`, `status`, `user`, `created_at`, `updated_at`) VALUES
(1, '0001', 32.5, 0, NULL, '2024-03-21 19:22:51', '2024-03-29 03:34:01');

-- --------------------------------------------------------

--
-- Table structure for table `device_info`
--

CREATE TABLE `device_info` (
  `id` int(11) NOT NULL,
  `device` int(11) NOT NULL,
  `distance` float NOT NULL,
  `percentage` int(100) NOT NULL,
  `changes` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `device_info`
--

INSERT INTO `device_info` (`id`, `device`, `distance`, `percentage`, `changes`, `updated_at`) VALUES
(1, 1, 26, 100, 0, '2024-04-02 03:03:10');

-- --------------------------------------------------------

--
-- Table structure for table `device_log`
--

CREATE TABLE `device_log` (
  `id` int(11) NOT NULL,
  `device` int(11) NOT NULL,
  `percentage` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `device_log`
--

INSERT INTO `device_log` (`id`, `device`, `percentage`, `createdAt`, `updatedAt`) VALUES
(42, 1, 96, '2024-03-29 04:12:30', '2024-03-29 04:12:30'),
(43, 1, 96, '2024-03-29 04:42:41', '2024-03-29 04:42:41'),
(44, 1, 94, '2024-03-29 05:24:17', '2024-03-28 23:32:59'),
(45, 1, 94, '2024-03-29 05:54:17', '2024-03-29 05:54:17'),
(48, 1, 91, '2024-03-29 07:33:25', '2024-03-29 07:33:25'),
(49, 1, 91, '2024-03-29 07:48:25', '2024-03-29 07:48:25'),
(50, 1, 90, '2024-03-29 08:03:25', '2024-03-29 08:03:25'),
(51, 1, 90, '2024-03-29 08:18:25', '2024-03-29 08:18:25'),
(52, 1, 90, '2024-03-29 08:33:25', '2024-03-29 08:33:25'),
(53, 1, 90, '2024-03-29 08:48:25', '2024-03-29 08:48:25'),
(54, 1, 90, '2024-03-29 09:03:25', '2024-03-29 09:03:25'),
(55, 1, 90, '2024-03-29 09:18:25', '2024-03-29 09:18:25'),
(56, 1, 90, '2024-03-29 09:33:25', '2024-03-29 09:33:25'),
(57, 1, 90, '2024-03-29 09:48:25', '2024-03-29 09:48:25'),
(58, 1, 89, '2024-03-29 10:03:25', '2024-03-29 10:03:25'),
(59, 1, 89, '2024-03-29 10:18:25', '2024-03-29 10:18:25'),
(60, 1, 89, '2024-03-29 10:33:25', '2024-03-29 10:33:25'),
(61, 1, 89, '2024-03-29 17:30:45', '2024-03-29 17:30:45'),
(63, 1, 98, '2024-03-29 17:45:44', '2024-03-29 17:45:44'),
(64, 1, 99, '2024-03-29 18:33:52', '2024-03-29 18:33:52'),
(65, 1, 99, '2024-03-29 18:48:52', '2024-03-29 18:48:52'),
(92, 1, 98, '2024-03-29 19:17:04', '2024-03-29 19:17:04'),
(93, 1, 99, '2024-03-29 19:47:23', '2024-03-29 19:47:23'),
(94, 1, 100, '2024-03-29 20:17:26', '2024-03-29 20:17:26'),
(95, 1, 100, '2024-03-29 20:47:29', '2024-03-29 20:47:29'),
(96, 1, 100, '2024-03-29 21:17:31', '2024-03-29 21:17:31'),
(97, 1, 100, '2024-03-29 21:47:34', '2024-03-29 21:47:34'),
(98, 1, 100, '2024-03-29 22:17:39', '2024-03-29 22:17:39'),
(99, 1, 100, '2024-03-29 22:47:39', '2024-03-29 22:47:39'),
(100, 1, 100, '2024-03-29 23:17:39', '2024-03-29 23:17:39'),
(101, 1, 100, '2024-03-29 23:47:42', '2024-03-29 23:47:42'),
(102, 1, 100, '2024-03-30 00:17:44', '2024-03-30 00:17:44'),
(103, 1, 100, '2024-03-30 01:02:45', '2024-03-30 01:02:45'),
(104, 1, 100, '2024-03-30 01:32:47', '2024-03-30 01:32:47'),
(105, 1, 100, '2024-03-30 02:02:50', '2024-03-30 02:02:50'),
(106, 1, 100, '2024-03-30 02:32:52', '2024-03-30 02:32:52'),
(107, 1, 100, '2024-03-30 03:02:55', '2024-03-30 03:02:55'),
(108, 1, 100, '2024-03-30 03:32:58', '2024-03-30 03:32:58'),
(109, 1, 100, '2024-03-30 04:03:00', '2024-03-30 04:03:00'),
(110, 1, 98, '2024-03-30 04:33:03', '2024-03-30 04:33:03'),
(111, 1, 98, '2024-03-30 05:03:06', '2024-03-30 05:03:06'),
(112, 1, 90, '2024-03-30 05:33:08', '2024-03-30 05:33:08'),
(113, 1, 86, '2024-03-30 06:03:09', '2024-03-30 06:03:09'),
(114, 1, 86, '2024-03-30 06:33:12', '2024-03-30 06:33:12'),
(115, 1, 86, '2024-03-30 07:03:12', '2024-03-30 07:03:12'),
(116, 1, 85, '2024-03-30 07:33:12', '2024-03-30 07:33:12'),
(117, 1, 85, '2024-03-30 08:03:12', '2024-03-30 08:03:12'),
(118, 1, 85, '2024-03-30 08:33:13', '2024-03-30 08:33:13'),
(119, 1, 85, '2024-03-30 09:03:13', '2024-03-30 09:03:13'),
(120, 1, 94, '2024-03-30 17:29:28', '2024-03-30 17:29:28'),
(121, 1, 97, '2024-03-30 18:13:58', '2024-03-30 18:13:58'),
(122, 1, 100, '2024-03-30 18:43:59', '2024-03-30 18:43:59'),
(123, 1, 98, '2024-03-30 19:14:00', '2024-03-30 19:14:00'),
(124, 1, 98, '2024-03-30 19:44:02', '2024-03-30 19:44:02'),
(125, 1, 98, '2024-03-30 20:14:03', '2024-03-30 20:14:03'),
(126, 1, 98, '2024-03-30 20:44:04', '2024-03-30 20:44:04'),
(127, 1, 96, '2024-03-30 21:14:17', '2024-03-30 21:14:17'),
(128, 1, 91, '2024-03-30 21:44:07', '2024-03-30 21:44:07'),
(129, 1, 85, '2024-03-30 22:14:09', '2024-03-30 22:14:09'),
(130, 1, 100, '2024-03-30 22:44:10', '2024-03-30 22:44:10'),
(131, 1, 83, '2024-03-30 23:14:10', '2024-03-30 23:14:10'),
(132, 1, 92, '2024-03-30 23:44:11', '2024-03-30 23:44:11'),
(133, 1, 97, '2024-03-31 00:14:13', '2024-03-31 00:14:13'),
(134, 1, 98, '2024-03-31 00:44:16', '2024-03-31 00:44:16'),
(135, 1, 99, '2024-03-31 01:14:18', '2024-03-31 01:14:18'),
(136, 1, 99, '2024-03-31 01:44:20', '2024-03-31 01:44:20'),
(137, 1, 100, '2024-03-31 02:14:23', '2024-03-31 02:14:23'),
(138, 1, 100, '2024-03-31 02:44:24', '2024-03-31 02:44:24'),
(139, 1, 100, '2024-03-31 03:14:26', '2024-03-31 03:14:26'),
(140, 1, 100, '2024-03-31 03:44:29', '2024-03-31 03:44:29'),
(141, 1, 100, '2024-03-31 04:14:29', '2024-03-31 04:14:29'),
(142, 1, 100, '2024-03-31 04:44:32', '2024-03-31 04:44:32'),
(143, 1, 100, '2024-03-31 05:14:35', '2024-03-31 05:14:35'),
(144, 1, 100, '2024-03-31 05:44:37', '2024-03-31 05:44:37'),
(145, 1, 99, '2024-03-31 06:14:40', '2024-03-31 06:14:40'),
(146, 1, 98, '2024-03-31 06:44:42', '2024-03-31 06:44:42'),
(147, 1, 97, '2024-03-31 07:14:45', '2024-03-31 07:14:45'),
(148, 1, 97, '2024-03-31 07:44:48', '2024-03-31 07:44:48'),
(149, 1, 93, '2024-03-31 08:14:51', '2024-03-31 08:14:51'),
(150, 1, 93, '2024-03-31 08:44:51', '2024-03-31 08:44:51'),
(151, 1, 92, '2024-03-31 09:14:54', '2024-03-31 09:14:54'),
(152, 1, 93, '2024-03-31 09:44:56', '2024-03-31 09:44:56'),
(153, 1, 93, '2024-03-31 10:14:57', '2024-03-31 10:14:57'),
(154, 1, 93, '2024-03-31 10:44:57', '2024-03-31 10:44:57'),
(155, 1, 96, '2024-03-31 11:15:00', '2024-03-31 11:15:00'),
(156, 1, 100, '2024-03-31 17:37:01', '2024-03-31 17:37:01'),
(157, 1, 100, '2024-03-31 18:07:03', '2024-03-31 18:07:03'),
(158, 1, 100, '2024-03-31 18:37:06', '2024-03-31 18:37:06'),
(159, 1, 100, '2024-03-31 19:07:08', '2024-03-31 19:07:08'),
(160, 1, 98, '2024-03-31 19:37:10', '2024-03-31 19:37:10'),
(161, 1, 100, '2024-03-31 20:07:12', '2024-03-31 20:07:12'),
(162, 1, 88, '2024-04-01 05:35:42', '2024-04-01 05:35:42'),
(163, 1, 88, '2024-04-01 06:05:44', '2024-04-01 06:05:44'),
(164, 1, 85, '2024-04-01 06:35:45', '2024-04-01 06:35:45'),
(165, 1, 85, '2024-04-01 07:05:48', '2024-04-01 07:05:48'),
(166, 1, 83, '2024-04-01 07:35:50', '2024-04-01 07:35:50'),
(167, 1, 83, '2024-04-01 08:05:50', '2024-04-01 08:05:50'),
(168, 1, 83, '2024-04-01 08:35:50', '2024-04-01 08:35:50'),
(169, 1, 83, '2024-04-01 09:05:51', '2024-04-01 09:05:51'),
(170, 1, 84, '2024-04-01 09:35:53', '2024-04-01 09:35:53'),
(171, 1, 99, '2024-04-01 14:02:54', '2024-04-01 14:02:54'),
(172, 1, 100, '2024-04-01 14:32:57', '2024-04-01 14:32:57'),
(173, 1, 100, '2024-04-01 15:02:59', '2024-04-01 15:02:59'),
(174, 1, 100, '2024-04-01 15:33:01', '2024-04-01 15:33:01'),
(175, 1, 100, '2024-04-01 16:03:03', '2024-04-01 16:03:03'),
(176, 1, 100, '2024-04-01 16:33:06', '2024-04-01 16:33:06'),
(177, 1, 100, '2024-04-01 17:03:08', '2024-04-01 17:03:08'),
(178, 1, 100, '2024-04-01 17:33:11', '2024-04-01 17:33:11'),
(179, 1, 100, '2024-04-01 18:03:13', '2024-04-01 18:03:13'),
(180, 1, 100, '2024-04-01 18:33:16', '2024-04-01 18:33:16'),
(181, 1, 100, '2024-04-01 19:03:18', '2024-04-01 19:03:18'),
(182, 1, 100, '2024-04-01 19:33:21', '2024-04-01 19:33:21'),
(183, 1, 100, '2024-04-01 20:03:23', '2024-04-01 20:03:23'),
(184, 1, 100, '2024-04-01 20:33:26', '2024-04-01 20:33:26'),
(185, 1, 100, '2024-04-01 21:03:28', '2024-04-01 21:03:28'),
(186, 1, 100, '2024-04-01 21:33:30', '2024-04-01 21:33:30'),
(187, 1, 100, '2024-04-01 22:03:33', '2024-04-01 22:03:33'),
(188, 1, 100, '2024-04-01 22:33:35', '2024-04-01 22:33:35'),
(189, 1, 100, '2024-04-01 23:03:36', '2024-04-01 23:03:36'),
(190, 1, 100, '2024-04-01 23:33:39', '2024-04-01 23:33:39'),
(191, 1, 100, '2024-04-02 00:03:41', '2024-04-02 00:03:41'),
(192, 1, 100, '2024-04-02 00:33:43', '2024-04-02 00:33:43'),
(193, 1, 100, '2024-04-02 01:03:45', '2024-04-02 01:03:45'),
(194, 1, 100, '2024-04-02 01:33:47', '2024-04-02 01:33:47'),
(195, 1, 100, '2024-04-02 02:03:49', '2024-04-02 02:03:49'),
(196, 1, 100, '2024-04-02 03:06:38', '2024-04-02 03:06:38'),
(197, 1, 100, '2024-04-02 03:36:41', '2024-04-02 03:36:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `serial` (`serial`);

--
-- Indexes for table `device_info`
--
ALTER TABLE `device_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `device_log`
--
ALTER TABLE `device_log`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device`
--
ALTER TABLE `device`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `device_info`
--
ALTER TABLE `device_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `device_log`
--
ALTER TABLE `device_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
