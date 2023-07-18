function solve() {

    function createElement(type,
                           textContent = "",
                           classes = [],
                           listener = "",
    ) {
        const element = document.createElement(type);

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

    function createPost(event) {
        event.preventDefault();

        const newArticle = createElement("article");
        newArticle.appendChild(createElement("h1", titleField.value));

        const category = createElement("p", "Category: ");
        category.appendChild(createElement("strong", categoryField.value));
        newArticle.appendChild(category);

        const creator = createElement("p", "Creator: ");
        creator.appendChild(createElement("strong", authorField.value));
        newArticle.appendChild(creator);

        newArticle.appendChild(createElement("p", contentField.value));

        const btnsDiv = createElement("div", "", ["buttons"]);
        btnsDiv.appendChild(createElement("button", "Delete", ["btn", "delete"], deletePost));
        btnsDiv.appendChild(createElement("button", "Archive", ["btn", "archive"], archivePost));
        newArticle.appendChild(btnsDiv);

        postsSection.appendChild(newArticle);
    }

    function archivePost(event) {
        const article = event.target.parentElement.parentElement;
        const title = article.querySelector("h1").textContent;
        archiveTitles.push(title);

        postsSection.removeChild(article);

        archiveSection.innerHTML = "";
        const sortedTitles = archiveTitles.sort((a, b) => a.localeCompare(b));

        sortedTitles.forEach(title => archiveSection.appendChild(createElement("li", title)));
    }

    function deletePost(event) {
        postsSection.removeChild(event.target.parentElement.parentElement);
    }

    const [authorField, titleField, categoryField] = document.querySelectorAll("input");
    const contentField = document.querySelector("#content");
    const createBtn = document.querySelector(".create");
    const postsSection = document.querySelector("main > section");
    const archiveSection = document.querySelector(".archive-section > ol");
    const archiveTitles = [];

    createBtn.addEventListener("click", createPost);
}
