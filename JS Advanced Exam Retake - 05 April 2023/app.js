window.addEventListener("load", solve);

function solve() {

    function btnHandler(event) {
        const btnName = event.target.textContent;
        const btnValue = event.target.value;

        const map = {
            "Add Gem": addGem,
            "Save to Collection": saveGem,
            "Edit Information": editGem,
            "Cancel": (event) => {
                event.target.parentElement.remove();
                addGemBtn.disabled = false;
            },
        };

        if (btnValue) {
            map[btnValue](event);
        }

        else {
            map[btnName](event);
        }
    }

    const resetFields = () => {
        Object.values(fields).forEach(field => field.value = "");
    };

    function createElement(tag,
                           textContent="",
                           classes=[],
                           listener="") {
        const element = document.createElement(tag);

        if (textContent) {
            element.textContent = textContent;
        }

        if (classes) {
            element.classList.add(...classes);
        }

        if (listener) {
            element.addEventListener("click", listener);
        }

        return element;
    }

    function addGem(event) {
        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        const li = createElement("li", "", ["gem-info"]);
        const article = createElement("article");

        article.appendChild(createElement("h4", `${fields.name.value}`));
        article.appendChild(createElement("p", `Color: ${fields.color.value}`));
        article.appendChild(createElement("p", `Carats: ${fields.carats.value}`));
        article.appendChild(createElement("p", `Price: ${fields.price.value}$`));
        article.appendChild(createElement("p", `Type: ${fields.type.value}`));

        li.appendChild(article);

        li.appendChild(createElement("button", "Save to Collection", ["save-btn"], btnHandler));
        li.appendChild(createElement("button", "Edit Information", ["edit-btn"], btnHandler));
        li.appendChild(createElement("button", "Cancel", ["cancel-btn"], btnHandler));

        sections.preview.appendChild(li);
        resetFields();
        addGemBtn.disabled = true;
    }

    function saveGem(event) {
        addGemBtn.disabled = false;
        const li = event.target.parentElement;
        li.remove();
        const article = li.querySelector("article");

        const name = article.querySelector("h4").textContent;
        const [color, carats, price, type] = article.querySelectorAll("p");

        const newLi = createElement("li");
        newLi.appendChild(createElement("p",
            `${name} - ${color.textContent}/ ${carats.textContent}/ ${price.textContent}/ ${type.textContent}`,
            ["collection-item"]));

        sections.collection.appendChild(newLi);
    }

    function editGem(event) {
        addGemBtn.disabled = false;
        const li = event.target.parentElement;
        const article = li.querySelector("article");

        const name = article.querySelector("h4").textContent;
        const [color, carats, price, type] = article.querySelectorAll("p");

        fields.name.value = name;
        fields.color.value = color.textContent.split("Color: ")[1];
        fields.carats.value = carats.textContent.split("Carats: ")[1];
        fields.price.value = price.textContent.match(/\d+/g);
        fields.type.value = type.textContent.split("Type: ")[1];

        li.remove();
    }

    const fields = {
        name: document.querySelector("#gem-name"),
        color: document.querySelector("#color"),
        carats: document.querySelector("#carats"),
        price: document.querySelector("#price"),
        type: document.querySelector("#type"),
    };

    const sections = {
        preview: document.querySelector("#preview-list"),
        collection: document.querySelector("#collection")
    };

    const addGemBtn = document.querySelector("#add-btn");
    addGemBtn.addEventListener("click", btnHandler);
}