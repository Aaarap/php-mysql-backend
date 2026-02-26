<?php
include "config.php";

$limit = 5;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$offset = ($page - 1) * $limit;

$result = mysqli_query($conn, "SELECT * FROM users LIMIT $limit OFFSET $offset");

while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>{$row['id']}</td>";
    echo "<td>{$row['ime']}</td>";
    echo "<td>{$row['prezime']}</td>";
    echo "<td>{$row['email']}</td>";

    echo "<td>
        <button class='btn btn-warning btn-sm'
            onclick=\"editUser(
                '{$row['id']}',
                '{$row['ime']}',
                '{$row['prezime']}',
                '{$row['email']}'
            )\">Edit</button>

        <button class='btn btn-danger btn-sm'
            onclick=\"deleteUser({$row['id']})\">Delete</button>
    </td>";

    echo "</tr>";
}
?>