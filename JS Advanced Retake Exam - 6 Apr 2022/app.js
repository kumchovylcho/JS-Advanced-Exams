window.addEventListener("load", solve);

function solve() {

    function createElement(type,
                           textContent="",
                           classes=[],
                           listener="") {
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

    function publishPost() {
        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        const li = createElement("li", "", ["rpost"]);
        const article = createElement("article");
        article.appendChild(createElement("h4", fields.title.value));
        article.appendChild(createElement("p", `Category: ${fields.category.value}`));
        article.appendChild(createElement("p", `Content: ${fields.content.value}`));

        li.appendChild(article);
        li.appendChild(createElement("button", "Edit", ["action-btn", "edit"], editPost));
        li.appendChild(createElement("button", "Approve", ["action-btn", "approve"], approvePost));

        sections.review.appendChild(li);

        clearFields()
    }

    function editPost(event) {
        const li = event.target.parentElement;
        const article = li.querySelector("article");

        const title = article.querySelector("h4");
        const [category, content] = article.querySelectorAll("p");

        fields.title.value = title.textContent;
        fields.category.value = category.textContent.split("Category: ")[1];
        fields.content.value = content.textContent.split("Content: ")[1];
        li.remove();
    }

    function approvePost(event) {
        const li = event.target.parentElement;

        li.removeChild(li.lastChild);
        li.removeChild(li.lastChild);
        li.remove();

        sections.upload.appendChild(li);
    }

    const fields = {
        title: document.querySelector("#post-title"),
        category: document.querySelector("#post-category"),
        content: document.querySelector("#post-content"),
    };

    const sections = {
        review: document.querySelector("#review-list"),
        upload: document.querySelector("#published-list"),
    };

    const clearFields = () => {
        Object.values(fields).forEach(field => field.value = "");
    };

    const publishBtn = document.querySelector("#publish-btn");
    const clearBtn = document.querySelector("#clear-btn");

    publishBtn.addEventListener("click", publishPost);
    clearBtn.addEventListener("click", () => {
        sections.upload.innerHTML = "";
    });
}
