<?php
include "config.php";

$id = $_POST["id"];

if ($id == "") {
    echo "ID mora biti unesen!";
    exit;
}

$sql = "DELETE FROM users WHERE id=?";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $id);

if (mysqli_stmt_execute($stmt)) {
    echo "Korisnik obrisan!";
} else {
    echo "Greška pri brisanju!";
}
?>