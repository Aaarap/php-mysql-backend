var currentPage = 1;
var rowsPerPage = 5; 

loadUsers();

function loadUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "backend/read.php?page=" + currentPage, true);

    xhr.onload = function () {
        document.getElementById("usersTable").innerHTML = xhr.responseText;
    };

    xhr.send();
}

document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var ime = document.getElementById("ime").value.trim();
    var prezime = document.getElementById("prezime").value.trim();
    var email = document.getElementById("email").value.trim();

    if (ime === "" || prezime === "" || email === "") {
        alert("Sva polja moraju biti popunjena!");
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email nije validan!");
        return;
    }

    submitForm();
});

function submitForm() {
    var id = document.getElementById("userId").value;
    var ime = document.getElementById("ime").value;
    var prezime = document.getElementById("prezime").value;
    var email = document.getElementById("email").value;

    var data = "ime=" + encodeURIComponent(ime) +
               "&prezime=" + encodeURIComponent(prezime) +
               "&email=" + encodeURIComponent(email);

    var url = "backend/create.php";
    if (id !== "") {
        data += "&id=" + encodeURIComponent(id);
        url = "backend/update.php";
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        loadUsers();
        document.getElementById("userForm").reset();
        document.getElementById("userId").value = "";
    };
    xhr.send(data);
}

function editUser(id, ime, prezime, email) {
    document.getElementById("userId").value = id;
    document.getElementById("ime").value = ime;
    document.getElementById("prezime").value = prezime;
    document.getElementById("email").value = email;
}

function deleteUser(id) {
    Swal.fire({
        title: 'Jeste li sigurni?',
        text: "Ova akcija se ne može poništiti!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Da, obriši!',
        cancelButtonText: 'Odustani'
    }).then((result) => {
        if (result.isConfirmed) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "backend/delete.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                loadUsers();
                Swal.fire(
                    'Obrisano!',
                    'Korisnik je obrisan.',
                    'success'
                )
            };
            xhr.send("id=" + id);
        }
    })
}

document.getElementById("searchInput").addEventListener("keyup", function() {
    var filter = this.value.toLowerCase();
    var rows = document.querySelectorAll("#usersTable tr");

    rows.forEach(function(row) {
        var ime = row.cells[1].innerText.toLowerCase();
        var prezime = row.cells[2].innerText.toLowerCase();
        var email = row.cells[3].innerText.toLowerCase();

        if (ime.includes(filter) || prezime.includes(filter) || email.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

document.getElementById("prevBtn").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        loadUsers();
    }
});

document.getElementById("nextBtn").addEventListener("click", function() {
    currentPage++;
    loadUsers();
});