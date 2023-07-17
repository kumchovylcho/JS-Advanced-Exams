function solve() {

    function createElement(type,
                           textContent="",
                           klass="",
                           listener="") {
        const element = document.createElement(type);

        if (textContent) {
            element.textContent = textContent;
        }

        if (klass) {
            element.classList.add(klass);
        }

        if (listener) {
            element.addEventListener("click", listener);
        }

        return element;
    }

    function addTask(event) {
        event.preventDefault();

        if (!titleField.value || !dateField.value || !descriptionField.value) {
            return;
        }

        const newArticle = createElement("article");
        newArticle.appendChild(createElement("h3", titleField.value));
        newArticle.appendChild(createElement("p", `Description: ${descriptionField.value}`));
        newArticle.appendChild(createElement("p", `Due Date: ${dateField.value}`));

        const div = createElement("div", "", "flex");
        div.appendChild(createElement("button", "Start", "green", handleTask));
        div.appendChild(createElement("button", "Delete", "red", handleTask));

        newArticle.appendChild(div);
        openTask.appendChild(newArticle);
    }

    function handleTask(event) {
        const btnName = event.target.textContent;
        const article = event.target.parentElement.parentElement;
        const parentDiv = article.parentElement;
        const btnsDiv = article.querySelector(".flex");

        if (btnName === "Start") {
            parentDiv.removeChild(article);
            removeBtns(btnsDiv);
            btnsDiv.appendChild(createElement("button", "Delete", "red", handleTask));
            btnsDiv.appendChild(createElement("button", "Finish", "orange", handleTask));

            inProgressTasks.appendChild(article);
        }

        else if (btnName === "Delete") {
             parentDiv.removeChild(article);
        }

        else if (btnName === "Finish") {
            article.removeChild(btnsDiv);
            completedTasks.appendChild(article);
        }
    }

    function removeBtns(btnDiv) {
        btnDiv.removeChild(btnDiv.lastChild)
        btnDiv.removeChild(btnDiv.lastChild)
    }

    const [titleField, dateField] = document.querySelectorAll("input");
    const descriptionField = document.querySelector("#description");
    const addBtn = document.querySelector("#add");
    const sections = document.querySelectorAll("section")

    const [, openTask] = sections[1].querySelectorAll("div")
    const [, completedTasks] = sections[3].querySelectorAll("div")

    const inProgressTasks = document.querySelector("#in-progress")

    addBtn.addEventListener("click", addTask);
}