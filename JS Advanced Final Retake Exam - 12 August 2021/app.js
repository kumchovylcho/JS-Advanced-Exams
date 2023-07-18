window.addEventListener('load', solve);

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

    function validFields() {
        if (!modelField.value ||
            !descriptionField.value ||
            !yearField.value ||
            !priceField.value) {
            return false;
        }

        if (Number(yearField.value) < 0 ||
            Number(priceField.value) < 0) {
            return false;
        }

        return true;
    }

    function addFurniture(event) {
        event.preventDefault();

        if (!validFields()) {
            return;
        }

        const row = createElement("tr", "", "info");
        row.appendChild(createElement("td", modelField.value));
        row.appendChild(createElement("td", Number(priceField.value).toFixed(2)));

        const buttonsData = createElement("td");
        buttonsData.appendChild(createElement("button", "More Info", "moreBtn", showHandler));
        buttonsData.appendChild(createElement("button", "Buy it", "buyBtn", buyItem));

        row.appendChild(buttonsData);

        const hideRow = createElement("tr", "", "hide");
        hideRow.appendChild(createElement("td", `Year: ${yearField.value}`));

        const description = createElement("td", `Description: ${descriptionField.value}`, "");
        description.setAttribute("colspan", 3);
        hideRow.appendChild(description);

        row.appendChild(hideRow);
        furnitureList.appendChild(row);
    }

    function showHandler(event) {
        let btn = event.target;
        const hideRow = event.target.parentElement.parentElement.querySelector(".hide")

        if (btn.textContent === "More Info") {
            btn.textContent = "Less Info";
            hideRow.style.display = "contents"
        }

        else {
            hideRow.style.display = "none";
            btn.textContent = "More Info";
        }
    }

    function buyItem(event) {
        const row = event.target.parentElement.parentElement;
        row.remove();

        const itemPrice = Number(row.querySelector("td").nextSibling.textContent);

        totalPrice.textContent = (Number(totalPrice.textContent) + itemPrice).toFixed(2);
    }

    const modelField = document.querySelector("#model");
    const yearField = document.querySelector("#year");
    const descriptionField = document.querySelector("#description");
    const priceField = document.querySelector("#price")
    const furnitureList = document.querySelector("#furniture-list");
    let totalPrice = document.querySelector(".total-price")

    const addBtn = document.querySelector("#add");

    addBtn.addEventListener("click", addFurniture);
}
