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

    function publishOffer(event) {
        event.preventDefault();

        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        if (Number(fields.originalCost.value > Number(fields.sellingPrice.value))) {
            return;
        }

        const row = createElement("tr", "", ["row"]);
        row.appendChild(createElement("td", fields.make.value));
        row.appendChild(createElement("td", fields.model.value));
        row.appendChild(createElement("td", fields.year.value));
        row.appendChild(createElement("td", fields.fuel.value));
        row.appendChild(createElement("td", fields.originalCost.value));
        row.appendChild(createElement("td", fields.sellingPrice.value));

        const buttonsTd = createElement("td");
        buttonsTd.appendChild(createElement("button", "Edit", ["action-btn", "edit"], editOffer));
        buttonsTd.appendChild(createElement("button", "Sell", ["action-btn", "sell"], sellOffer));

        row.appendChild(buttonsTd);
        sections.tbody.appendChild(row);

        clearFields();
    }

    function editOffer(event) {
        const row = event.target.parentElement.parentElement;
        row.remove();

        const info = Array.from(row.querySelectorAll("td"));
        info.pop();

        Object.values(fields).forEach((field, index) => {
            field.value = info[index].textContent;
        });
    }

    function sellOffer(event) {
        const row = event.target.parentElement.parentElement;
        row.remove();

        const [make, model, year, _, originalPrice, sellPrice] = Array.from(row.querySelectorAll("td")).slice(0, -1);
        const profit = Number(sellPrice.textContent) - Number(originalPrice.textContent)

        const li = createElement("li", "", ["each-list"]);
        li.appendChild(createElement("span", `${make.textContent} ${model.textContent}`));
        li.appendChild(createElement("span", `${year.textContent}`));
        li.appendChild(createElement("span", `${profit}`));

        sections.soldCars.appendChild(li);

        sections.profit.textContent = (Number(sections.profit.textContent) + profit).toFixed(2)
    }

    const clearFields = () => {
        Object.values(fields).forEach(field => field.value = "");
    };

    const fields = {
        make: document.querySelector("#make"),
        model: document.querySelector("#model"),
        year: document.querySelector("#year"),
        fuel: document.querySelector("#fuel"),
        originalCost: document.querySelector("#original-cost"),
        sellingPrice: document.querySelector("#selling-price"),
    };

    const sections = {
        tbody: document.querySelector("#table-body"),
        soldCars: document.querySelector("#cars-list"),
        profit: document.querySelector("#profit"),
    };

    const publishBtn = document.querySelector("#publish");
    publishBtn.addEventListener("click", publishOffer);
}
