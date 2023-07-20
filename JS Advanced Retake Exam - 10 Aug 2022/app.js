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

    function addDish() {
        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        const li = createElement("li", "", ["each-line"]);
        const article = createElement("article");
        article.appendChild(createElement("h4", `${fields.fName.value} ${fields.lName.value}`));
        article.appendChild(createElement("p", `${fields.gender.value}, ${fields.age.value}`));
        article.appendChild(createElement("p", `Dish description: ${fields.description.value}`));

        li.appendChild(article);
        li.appendChild(createElement("button", "Edit", ["edit-btn"], editDish));
        li.appendChild(createElement("button", "Mark as complete", ["complete-btn"], completeDish));

        sections.inProgress.appendChild(li);

        resetFields();
        addRemoveProgress(true);
    }

    function editDish(event) {
        addRemoveProgress(false);

        const li = event.target.parentElement;
        li.remove();

        const [fName, lName] = li.querySelector("article > h4").textContent.split(" ");
        const [genderAge, description] = li.querySelectorAll("article > p");

        fields.fName.value = fName;
        fields.lName.value = lName;

        const [gender, age] = genderAge.textContent.split(", ");
        fields.gender.value = gender;
        fields.age.value = age;
        fields.description.value = description.textContent.split("Dish description: ")[1];
    }

    function completeDish(event) {
        const li = event.target.parentElement;
        li.removeChild(li.lastChild);
        li.removeChild(li.lastChild);
        li.remove();

        addRemoveProgress(false);
        sections.finished.appendChild(li);
    }

    const resetFields = () => {
        Object.values(fields).forEach(field => field.value = "");
    };

    const addRemoveProgress = (add=true) => {
        if (add) {
            sections.progressCount.textContent = parseInt(sections.progressCount.textContent) + 1;
        }

        else {
            sections.progressCount.textContent = parseInt(sections.progressCount.textContent) - 1;
        }
    }

    const fields = {
        fName: document.querySelector("#first-name"),
        lName: document.querySelector("#last-name"),
        age: document.querySelector("#age"),
        gender: document.querySelector("#genderSelect"),
        description: document.querySelector("#task"),
    };

    const sections = {
        inProgress: document.querySelector("#in-progress"),
        progressCount: document.querySelector("#progress-count"),
        finished: document.querySelector("#finished"),
    };

    const submitBtn = document.querySelector("#form-btn");
    const clearPostsBtn = document.querySelector("#clear-btn");

    submitBtn.addEventListener("click", addDish);
    clearPostsBtn.addEventListener("click", () => {
        sections.finished.innerHTML = "";
    });
}
