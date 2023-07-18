window.addEventListener('load', solve);

function solve() {

    function createElement(tag,
                           textContent="",
                           klass="",
                           attrs=null,
                           listener="") {
        const element = document.createElement(tag);

        if (textContent) {
            element.textContent = textContent;
        }

        if (klass) {
            element.classList.add(klass);
        }

        if (attrs !== null) {
            element.setAttribute(attrs.attr, attrs.value);
        }

        if (listener) {
            element.addEventListener("click", listener);
        }

        return element;
    }

    function addSong(event) {
        event.preventDefault();

        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        const div = createElement("div", "", "hits-info");
        div.appendChild(createElement("img", "", "", {attr: "src", value: "./static/img/img.png"}));
        div.appendChild(createElement("h2", `Genre: ${fields.genre.value}`));
        div.appendChild(createElement("h2", `Name: ${fields.songName.value}`));
        div.appendChild(createElement("h2", `Author: ${fields.author.value}`));
        div.appendChild(createElement("h3", `Date: ${fields.date.value}`));
        div.appendChild(createElement("button", "Save song", "save-btn", null, saveSong));
        div.appendChild(createElement("button", "Like song", "like-btn", null, likeSong));
        div.appendChild(createElement("button", "Delete", "delete-btn", null, deleteSong));

        sections.allHits.appendChild(div);

        Object.values(fields).forEach(field => field.value = "");
    }

    function likeSong(event) {
        const likes = parseInt(sections.likedSongs.textContent.split("Total Likes: ")[1]) + 1;
        sections.likedSongs.textContent = `Total Likes: ${likes}`;

        const btn = event.target;
        btn.disabled = true;
    }

    function saveSong(event) {
        const div = event.target.parentElement;

        div.removeChild(div.lastChild.previousSibling);
        div.removeChild(div.lastChild.previousSibling);

        div.remove();
        sections.savedHits.appendChild(div);
    }

    function deleteSong(event) {
        event.target.parentElement.remove();
    }

    const fields = {
        genre: document.querySelector("#genre"),
        songName: document.querySelector("#name"),
        author: document.querySelector("#author"),
        date: document.querySelector("#date")
    };

    const sections = {
        allHits: document.querySelector(".all-hits-container"),
        savedHits: document.querySelector(".saved-container"),
        likedSongs: document.querySelector(".likes > p")
    }

    const addBtn = document.querySelector("#add-btn");
    addBtn.addEventListener("click", addSong);
}