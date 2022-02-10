-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 1637.m.tld.pl
-- Generation Time: Feb 10, 2022 at 11:13 PM
-- Server version: 5.7.33-36-log
-- PHP Version: 7.3.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baza1637_kuba`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_auth`
--

CREATE TABLE `admin_auth` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `token` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_auth`
--

INSERT INTO `admin_auth` (`id`, `login`, `pass`, `token`) VALUES
(1, 'admin', 'admin', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDQ1MzE4NTIsImxvZ2luIjoiYWRtaW4ifQ.rrUTT7wNmLodQz3WLsL8DQYbz0okFRZeTjk6-IOvEsw');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `date_add` datetime DEFAULT NULL,
  `access_key` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `client_name`, `date_add`, `access_key`) VALUES
(1, 'dd', '2022-02-10 22:53:18', 'TsphCojrKF3JjAnGhjgj'),
(2, 'd', '2022-02-10 22:53:23', 'L6GYRQ6bv9jOfC2p8Zm5'),
(3, 'test', '2022-02-10 23:03:30', 'Bhj4KWi1nbz0Pm6Ko5XJ');

-- --------------------------------------------------------

--
-- Table structure for table `orders_products`
--

CREATE TABLE `orders_products` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `count` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders_products`
--

INSERT INTO `orders_products` (`id`, `order_id`, `product_id`, `count`) VALUES
(38, 3, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` float DEFAULT NULL,
  `duration` bigint(20) DEFAULT NULL,
  `status` tinyint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `duration`, `status`) VALUES
(3, 'Piaskowanie zębów', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida nisi felis. Cras tristique, tellus sit amet tincidunt mattis, velit purus mollis mauris, in fringilla leo est sit amet nunc. Aliquam nec nulla sodales, scelerisque augue id, posuere orci. Aliquam erat volutpat. Fusce blandit, leo eu ornare pellentesque, neque nisi facilisis nisl, ac vehicula orci mi varius metus. Integer auctor feugiat lectus in lobortis.', 150, 3600, 1),
(4, 'Skaling zębów', 'Nam libero est, elementum vitae finibus id, sagittis eu felis. Proin tortor odio, feugiat nec placerat et, eleifend ac mi. Quisque sollicitudin nulla a vulputate volutpat. In purus arcu, tincidunt et varius sit amet, vestibulum ut arcu. Phasellus congue ut ex in fermentum. Nam consectetur malesuada convallis. Fusce bibendum lacus non aliquam auctor. Aenean malesuada pulvinar justo. Cras tristique in nunc non sodales. Nulla blandit, erat at molestie posuere, ante augue aliquam dui, vel commodo tellus neque vitae urna.', 200, 7200, 1),
(5, 'Piaskowanie zębów', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus viverra lectus. Fusce in cursus libero. Sed sapien nisi, porta id mattis tristique, aliquam vitae magna. Vestibulum sed tempus lectus. In eget purus leo. Etiam mollis nisi ante, eu egestas turpis tempor in. Vivamus a diam accumsan, venenatis turpis in, sollicitudin quam. In et cursus risus, ut aliquet mauris. Vivamus sit amet eros quis nisl mattis rhoncus. Cras rutrum nibh eu velit tristique commodo.', 120, 2700, 0),
(6, 'Wybielanie zębów', 'Opis', 700, 2700, 0),
(7, 'Nakładki na zęby', 'Curabitur lacinia scelerisque ultrices. Aliquam aliquet at tellus eu fringilla. Sed pretium placerat sodales. Phasellus rhoncus ipsum nibh, convallis lobortis eros tempor ut. Sed elit metus, pretium ac dui non, elementum venenatis turpis. Etiam id risus id tortor interdum placerat molestie ut quam. Morbi suscipit elementum orci eget volutpat.', 300, 3600, 0),
(8, 'Skaling zębów', 'Etiam id feugiat leo, id efficitur neque. Proin congue lorem arcu, vitae facilisis massa accumsan sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque quis mi ac sapien molestie sollicitudin non sit amet dolor. In massa urna, semper ac euismod a, scelerisque id neque. Aliquam faucibus, tortor at interdum pellentesque, lorem purus lacinia mauris, ultrices tincidunt leo orci quis dui. Vivamus tincidunt, turpis ut rhoncus fermentum, mauris lectus dignissim urna, quis tincidunt dui sem sit amet risus. Aliquam aliquet elit in lorem mattis vestibulum. Proin eget quam arcu. Donec porttitor auctor magna, quis feugiat nunc iaculis vitae. Sed eu iaculis mauris. Fusce mattis, tortor et placerat scelerisque, metus enim venenatis est, semper elementum metus ex non erat. Donec aliquam malesuada velit. In non placerat neque, ac ornare enim. Duis ut libero vitae eros molestie placerat. Phasellus fringilla semper quam, a semper tellus tristique quis.', 200, 5400, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_auth`
--
ALTER TABLE `admin_auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_products_ibfk_1` (`order_id`),
  ADD KEY `orders_products_ibfk_2` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_auth`
--
ALTER TABLE `admin_auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `orders_products`
--
ALTER TABLE `orders_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
