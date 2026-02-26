<?php
$conn = mysqli_connect("localhost", "root", "", "php_mysql_backend");

if (!$conn) {
    die("Greška pri konekciji na bazu!");
}
?>