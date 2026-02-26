<?php
include "config.php";

$id      = $_POST["id"];
$ime     = $_POST["ime"];
$prezime = $_POST["prezime"];
$email   = $_POST["email"];

if ($id == "" || $ime == "" || $prezime == "" || $email == "") {
    echo "Sva polja su obavezna!";
    exit;
}

$sql = "UPDATE users SET ime=?, prezime=?, email=? WHERE id=?";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "sssi", $ime, $prezime, $email, $id);

if (mysqli_stmt_execute($stmt)) {
    echo "Korisnik je izmijenjen!";
} else {
    echo "Greška pri izmjeni!";
}
?>