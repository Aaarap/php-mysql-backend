<?php
include "config.php";

$ime     = $_POST["ime"];
$prezime = $_POST["prezime"];
$email   = $_POST["email"];

if ($ime == "" || $prezime == "" || $email == "") {
    echo "Sva polja moraju biti popunjena!";
    exit;
}

$sql = "INSERT INTO users (ime, prezime, email) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "sss", $ime, $prezime, $email);

if (mysqli_stmt_execute($stmt)) {
    echo "Korisnik uspješno dodan!";
} else {
    echo "Greška (email već postoji?)";
}
?>