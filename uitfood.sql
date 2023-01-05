-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 16, 2022 lúc 07:33 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `uitfood`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `address`
--

CREATE TABLE `address` (
  `add_id` int(11) NOT NULL,
  `add_house_num` varchar(200) DEFAULT NULL,
  `add_street` varchar(200) DEFAULT NULL,
  `add_district` varchar(200) NOT NULL,
  `add_city` varchar(200) NOT NULL,
  `cus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banner`
--

CREATE TABLE `banner` (
  `banner_id` int(11) NOT NULL,
  `banner_image` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `product_id` int(11) NOT NULL,
  `cart_quantity` int(11) NOT NULL,
  `cus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `cus_id` int(11) NOT NULL,
  `cus_image` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cus_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `cus_numphone` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `cus_email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `cus_pass` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `cus_birthday` date DEFAULT NULL,
  `cus_gender` tinyint(4) NOT NULL,
  `cus_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`cus_id`, `cus_image`, `cus_name`, `cus_numphone`, `cus_email`, `cus_pass`, `cus_birthday`, `cus_gender`, `cus_type`) VALUES
(1, NULL, 'Nguyễn Văn A', '0124122312', 'cusa@a.a', 'aaa', '2022-06-23', 0, 1),
(2, NULL, 'Trần Văn B', '0412832322', 'cusb@b.b', 'bbb', '1995-12-21', 0, 2),
(3, NULL, 'Nguyễn Hữu Thắng', '012412893', 'a', 'a', '1900-01-12', 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `delivery`
--

CREATE TABLE `delivery` (
  `invoice_id` int(11) NOT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `delivery_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discount`
--

CREATE TABLE `discount` (
  `dis_id` int(11) NOT NULL,
  `dis_image` varchar(200) NOT NULL,
  `dis_percent` int(11) NOT NULL,
  `dis_start` date NOT NULL,
  `dis_end` date NOT NULL,
  `dis_min` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `discount`
--

INSERT INTO `discount` (`dis_id`, `dis_image`, `dis_percent`, `dis_start`, `dis_end`, `dis_min`) VALUES
(1, '', 10000, '2022-06-08', '2022-06-23', 0),
(2, '', 134, '2022-06-02', '2022-06-04', 0),
(3, '', 10, '2022-06-03', '2022-06-04', 0),
(4, '', 10, '2022-06-03', '2022-06-04', 0),
(5, '', 120, '2022-06-03', '2022-06-04', 0),
(6, '', 120, '2022-06-03', '2022-06-04', 0),
(7, '', 130, '2022-06-03', '2022-06-04', 0),
(8, '', 140, '2022-06-03', '2022-06-04', 0),
(9, '', 110, '2022-06-03', '2022-06-04', 0),
(10, '', 20, '2022-06-03', '2022-06-04', 0),
(11, '', 10, '2022-06-16', '2022-06-21', 0),
(12, 'a.png', 10, '2022-06-08', '2022-06-23', 5000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(11) NOT NULL,
  `emp_image` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emp_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `emp_numphone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `emp_email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `emp_pass` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `emp_position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_image`, `emp_name`, `emp_numphone`, `emp_email`, `emp_pass`, `emp_position`) VALUES
(1, NULL, 'Nguyễn Hữu Thắng', '0999888777', 'thang@thang.thang', 'thang', 1),
(2, NULL, 'Hoàng Trí Tâm', '0777888999', 'tam@tam.tam', 'tam', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `cus_id` int(11) NOT NULL,
  `dis_id` int(11) DEFAULT NULL,
  `invoice_total` int(100) NOT NULL,
  `invoice_status` int(1) NOT NULL,
  `invoice_createddate` date NOT NULL,
  `invoice_feeship` int(11) NOT NULL,
  `invoice_discount` int(11) NOT NULL,
  `invoice_bill` varchar(200) NOT NULL,
  `invoice_statusdelivery` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `cus_id`, `dis_id`, `invoice_total`, `invoice_status`, `invoice_createddate`, `invoice_feeship`, `invoice_discount`, `invoice_bill`, `invoice_statusdelivery`) VALUES
(52, 3, NULL, 70000, 1, '2022-06-17', 30000, 10000, 'https://pay.stripe.com/receipts/acct_1L8dMOK7OHNnmWP4/ch_3LBMJNK7OHNnmWP40yzntvB5/rcpt_Lt8a3wBNORuuoYCkEFImSGLVdx3sQTl', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoice_detail`
--

CREATE TABLE `invoice_detail` (
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `inde_quantity` int(100) NOT NULL,
  `inde_total` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `invoice_detail`
--

INSERT INTO `invoice_detail` (`invoice_id`, `product_id`, `inde_quantity`, `inde_total`) VALUES
(52, 1, 10, 50000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `my_coupon`
--

CREATE TABLE `my_coupon` (
  `cus_id` int(11) NOT NULL,
  `dis_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `my_coupon`
--

INSERT INTO `my_coupon` (`cus_id`, `dis_id`) VALUES
(3, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `product_image` varchar(100) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_image`, `product_price`, `product_quantity`) VALUES
(1, 'Bánh mì không', 'https://www.thatlangon.com/wp-content/uploads/2020/05/cach-lam-banh-mi-viet-nam-hero.jpg', 5000, 42),
(2, 'Bánh mì giò', 'https://media.foody.vn/res/g104/1030891/prof/s/foody-upload-api-foody-mobile-banhmi-200619134611.jpg', 15000, 4),
(3, 'Bánh mì giò chả', 'https://media.foody.vn/res/g104/1030891/prof/s/foody-upload-api-foody-mobile-banhmi-200619134611.jpg', 25000, 24),
(4, 'Bánh mì cá', 'https://cdn.tgdd.vn/2020/10/content/7-750x600.jpg', 10000, 37),
(5, 'Bánh mì thịt băm', 'https://cdn.tgdd.vn/2021/07/CookProduct/Banhmihapthitbammohanh-1200x676.jpg', 12000, 50),
(6, 'Bánh mì nướng', 'https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/banh-mi-thit-bo-nuong-thumbnail-1.jpg', 15000, 20),
(7, 'Bánh mì rau', 'https://media.foody.vn/res/g19/180199/prof/s/foody-upload-api-foody-mobile-avar11-190730094037.jpg', 15000, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `review_comment` varchar(200) DEFAULT NULL,
  `review_rating` int(1) NOT NULL,
  `review_status` int(1) NOT NULL,
  `cus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `review`
--

INSERT INTO `review` (`review_id`, `product_id`, `review_comment`, `review_rating`, `review_status`, `cus_id`) VALUES
(1, 1, 'rất ngon, nhưng không có thịt', 5, 1, 3),
(2, 1, 'bánh mi khong ngon', 2, 1, 3),
(3, 1, 'bánh mi tam duoc thoi', 2, 1, 3),
(4, 1, 'danh gia thu', 4, 1, 3),
(5, 1, 'danh gia thu lan nua', 5, 1, 3),
(6, 2, 'tesstt', 2, 1, 3),
(7, 2, 'fw', 2, 1, 3),
(8, 1, 'dwqd', 5, 1, 3),
(9, 1, 'aaaa', 3, 1, 3),
(10, 1, '2231', 4, 1, 3);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`add_id`),
  ADD KEY `fk_add_cus` (`cus_id`);

--
-- Chỉ mục cho bảng `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`banner_id`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD KEY `fk_cart_cus` (`cus_id`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cus_id`);

--
-- Chỉ mục cho bảng `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `fk_deliver_emp` (`emp_id`);

--
-- Chỉ mục cho bảng `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`dis_id`);

--
-- Chỉ mục cho bảng `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`);

--
-- Chỉ mục cho bảng `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `fk_inv_cus` (`cus_id`),
  ADD KEY `fk_inv_dis` (`dis_id`);

--
-- Chỉ mục cho bảng `invoice_detail`
--
ALTER TABLE `invoice_detail`
  ADD PRIMARY KEY (`invoice_id`,`product_id`),
  ADD KEY `fk_inde_product` (`product_id`);

--
-- Chỉ mục cho bảng `my_coupon`
--
ALTER TABLE `my_coupon`
  ADD KEY `fk_mydis_cus` (`cus_id`),
  ADD KEY `fk_mydis_dis` (`dis_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Chỉ mục cho bảng `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `fk_rv_cus` (`cus_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `address`
--
ALTER TABLE `address`
  MODIFY `add_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `banner`
--
ALTER TABLE `banner`
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `cus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `discount`
--
ALTER TABLE `discount`
  MODIFY `dis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_add_cus` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`);

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_cus` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`),
  ADD CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Các ràng buộc cho bảng `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `fk_deliver_emp` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`),
  ADD CONSTRAINT `fk_deliver_inv` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`);

--
-- Các ràng buộc cho bảng `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `fk_inv_cus` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`),
  ADD CONSTRAINT `fk_inv_dis` FOREIGN KEY (`dis_id`) REFERENCES `discount` (`dis_id`);

--
-- Các ràng buộc cho bảng `invoice_detail`
--
ALTER TABLE `invoice_detail`
  ADD CONSTRAINT `fk_inde_inv` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`),
  ADD CONSTRAINT `fk_inde_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Các ràng buộc cho bảng `my_coupon`
--
ALTER TABLE `my_coupon`
  ADD CONSTRAINT `fk_mydis_cus` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`),
  ADD CONSTRAINT `fk_mydis_dis` FOREIGN KEY (`dis_id`) REFERENCES `discount` (`dis_id`);

--
-- Các ràng buộc cho bảng `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `fk_rv_cus` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`),
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
