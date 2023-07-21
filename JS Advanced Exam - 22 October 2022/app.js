window.addEventListener("load", solve);

function solve() {

    function createElement(tag,
                           textContent="",
                           classes=[],
                           listener="") {
        const element = document.createElement(tag);

        if (textContent) {
            element.textContent = textContent;
        }

        if (classes.length > 0) {
            element.classList.add(...classes);
        }

        if (listener) {
            element.addEventListener("click", listener);
        }

        return element;
    }

    function publishStory() {
        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        const li = createElement("li", "", ["story-info"]);
        const article = createElement("article");
        article.appendChild(createElement("h4", `Name: ${fields.fName.value} ${fields.lName.value}`));
        article.appendChild(createElement("p", `Age: ${fields.age.value}`));
        article.appendChild(createElement("p", `Title: ${fields.title.value}`));
        article.appendChild(createElement("p", `Genre: ${fields.genre.value}`));
        article.appendChild(createElement("p", fields.story.value));

        li.appendChild(article);
        li.appendChild(createElement("button", "Save Story", ["save-btn"], saveStory));
        li.appendChild(createElement("button", "Edit Story", ["edit-btn"], editStory));
        li.appendChild(createElement("button", "Delete Story", ["delete-btn"], deleteStory));

        previewList.appendChild(li);

        publishBtn.disabled = true;
        clearFields();
    }

    function saveStory() {
        mainDiv.innerHTML = "";
        mainDiv.appendChild(createElement("h1", "Your scary story is saved!"));
    }

    function editStory(event) {
        const li = event.target.parentElement;
        const article = li.querySelector("article");

        const name = article.querySelector("h4").textContent.split("Name: ")[1];
        const [age, title, genre, story] = article.querySelectorAll("p");

        const [fName, lName] = name.split(" ");
        fields.fName.value = fName;
        fields.lName.value = lName;
        fields.age.value = age.textContent.split("Age: ")[1];
        fields.title.value = title.textContent.split("Title: ")[1];
        fields.genre.value = genre.textContent.split("Genre: ")[1];
        fields.story.value = story.textContent;

        li.remove();
        publishBtn.disabled = false;
    }

    function deleteStory(event) {
        publishBtn.disabled = false;
        event.target.parentElement.remove();
    }

    const clearFields = () => {
        Object.values(fields).forEach(field => field.value = "");
    };

    const fields = {
        fName: document.querySelector("#first-name"),
        lName: document.querySelector("#last-name"),
        age: document.querySelector("#age"),
        title: document.querySelector("#story-title"),
        genre: document.querySelector("#genre"),
        story: document.querySelector("#story"),
    };

    const previewList = document.querySelector("#preview-list");
    const mainDiv = document.querySelector("#main");

    const publishBtn = document.querySelector("#form-btn");

    publishBtn.addEventListener("click", publishStory);
}
