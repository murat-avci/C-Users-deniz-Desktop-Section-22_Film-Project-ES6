const form = document.querySelector("#film-form");
const titleElement = form.querySelector("#title");
const producerElement = form.querySelector("#producer");
const urlElement = form.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clear-films");

// UI Objesini Başlatma

// const ui = new UI();

// Storage objesi üretme

// const storage = new Storage();

// Tüm eventleri yükleme

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function() {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
    const title = titleElement.value;
    const producer = producerElement.value;
    const url = urlElement.value;

    if (title === "" || producer === "" || url === "") {
        // Hata mesajı
        UI.displayMessages("Tüm alanları doldurunuz", "danger");

    } else {
        // Yeni film
        const newFilm = new Film(title, producer, url);
        UI.addFilmToUI(newFilm); // Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); // Storage a film ekleme
        UI.displayMessages("Film başarı ile eklenmiştir.", "success");
    }

    UI.clearInputs(titleElement, urlElement, producerElement);

    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı...", "success");
    }
}
function clearAllFilms() {
    if(confirm("Emin misiniz?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
}

