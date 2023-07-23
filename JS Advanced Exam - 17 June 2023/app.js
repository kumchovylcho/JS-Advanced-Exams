window.addEventListener('load', solve);

function solve() {

    function btnHandler(event) {
        const btnName = event.target.textContent;

        const map = {
            "Next": addPart,
            "Edit": editPart,
            "Continue": continueOrder,
            "Confirm": confirmOrder,
            "Cancel": (event) => {
                event.target.parentElement.remove();
                nextBtn.disabled = false;
            },
        };

        map[btnName](event);
    }

    function createElement(tag,
                           textContent = "",
                           classes = [],
                           listener = "") {
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

    function addPart(event) {
        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        if (fields.year.value < 1980 || fields.year.value > 2023) {
            return;
        }

        const li = createElement("li", "", ["part-content"]);
        const article = createElement("article");

        article.appendChild(createElement("p", `Car Model: ${fields.model.value}`));
        article.appendChild(createElement("p", `Car Year: ${fields.year.value}`));
        article.appendChild(createElement("p", `Part Name: ${fields.partName.value}`));
        article.appendChild(createElement("p", `Part Number: ${fields.partNumber.value}`));
        article.appendChild(createElement("p", `Condition: ${fields.condition.value}`));

        li.appendChild(article);

        li.appendChild(createElement("button", "Edit", ["edit-btn"], btnHandler));
        li.appendChild(createElement("button", "Continue", ["continue-btn"], btnHandler));

        sections.partInfo.appendChild(li);

        image.img.style.visibility = "hidden";
        image.text.textContent = "";
        nextBtn.disabled = true;
        resetFields();
    }

    function editPart(event) {
        const li = event.target.parentElement;
        const article = li.querySelector("article");
        nextBtn.disabled = false;

        const [model, year, partName, partNumber, condition] = article.querySelectorAll("p");
        fields.model.value = model.textContent.split("Car Model: ")[1];
        fields.year.value = year.textContent.split("Car Year: ")[1];
        fields.partName.value = partName.textContent.split("Part Name: ")[1];
        fields.partNumber.value = partNumber.textContent.split("Part Number: ")[1];
        fields.condition.value = condition.textContent.split("Condition: ")[1];

        li.remove();
    }

    function continueOrder(event) {
        const li = event.target.parentElement;
        li.removeChild(li.lastChild);
        li.removeChild(li.lastChild);

        li.appendChild(createElement("button", "Confirm", ["confirm-btn"], btnHandler));
        li.appendChild(createElement("button", "Cancel", ["cancel-btn"], btnHandler));

        li.remove();
        sections.confirmOrder.appendChild(li);
    }

    function confirmOrder(event) {
        event.target.parentElement.remove();
        nextBtn.disabled = false;
        image.img.style.visibility = "visible";
        image.text.textContent = "Part is Ordered!";
    }

    const resetFields = () => {
        Object.values(fields).forEach(field => field.value = "");
    };

    const fields = {
        model: document.querySelector("#car-model"),
        year: document.querySelector("#car-year"),
        partName: document.querySelector("#part-name"),
        partNumber: document.querySelector("#part-number"),
        condition: document.querySelector("#condition"),
    };

    const sections = {
        partInfo: document.querySelector(".info-list"),
        confirmOrder: document.querySelector(".confirm-list"),
    };

    const image = {
        img: document.querySelector("#complete-img"),
        text: document.querySelector("#complete-text"),
    };

    const nextBtn = document.querySelector("#next-btn");
    nextBtn.addEventListener("click", btnHandler);
}
