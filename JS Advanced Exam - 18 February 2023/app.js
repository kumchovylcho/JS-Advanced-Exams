window.addEventListener('load', solve);

function solve() {

    function createElement(tag,
                           textContent="",
                           classes=[],
                           listener="") {
        const element = document.createElement(tag);

        if (textContent) {
            element.textContent = textContent;
        }

        if (classes.length) {
            element.classList.add(...classes);
        }

        if (listener) {
            element.addEventListener("click", listener);
        }

        return element;
    }

    function buyTicket() {
        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        const li = createElement("li", "", ["ticket"]);
        const article = createElement("article");

        article.appendChild(createElement("h3", `Name: ${fields.fName.value} ${fields.lName.value}`));
        article.appendChild(createElement("p", `From date: ${fields.fromDate.value}`));
        article.appendChild(createElement("p", `For ${fields.days.value} days`));
        article.appendChild(createElement("p", `For ${fields.people.value} people`));

        li.appendChild(article);

        li.appendChild(createElement("button", "Edit", ["edit-btn"], btnHandler));
        li.appendChild(createElement("button", "Continue", ["continue-btn"], btnHandler));

        sections.preview.appendChild(li);

        resetFields();
        nextBtn.disabled = true;
    }

    function btnHandler(event) {
        const btnName = event.target.textContent;

        const map = {
            "Edit": editTicket,
            "Continue": continueTicket,
            "Confirm": confirmTicket,
            "Cancel": cancelTicket,
        };

        map[btnName](event);
    }

    function editTicket(event) {
        const li = event.target.parentElement;
        const article = li.querySelector("article");

        const [fName, lName] = article.querySelector("h3").textContent.split("Name: ")[1].split(" ");
        const [date, days, people] = article.querySelectorAll("p");

        fields.fName.value = fName;
        fields.lName.value = lName;
        fields.fromDate.value = date.textContent.split("From date: ")[1];
        fields.days.value = days.textContent.match(/\d+/g);
        fields.people.value = people.textContent.match(/\d+/g);

        nextBtn.disabled = false;
        li.remove();
    }

    function confirmTicket(event) {
        mainDiv.innerHTML = "";

        const h1 = createElement("h1", "Thank you, have a nice day! ");
        h1.id = "thank-you";
        mainDiv.appendChild(h1);

        const backBtn = createElement("button", "Back");
        backBtn.id = "back-btn";
        backBtn.addEventListener("click", () => {
            location.reload();
        });
        mainDiv.appendChild(backBtn);
    }

    function cancelTicket(event) {
        event.target.parentElement.remove();
        nextBtn.disabled = false;
    }

    function continueTicket(event) {
        const li = event.target.parentElement;

        const [editBtn, continueBtn] = li.querySelectorAll("button");
        editBtn.classList.remove("edit-btn");
        editBtn.classList.add("confirm-btn");
        editBtn.textContent = "Confirm";

        continueBtn.classList.remove("continue-btn");
        continueBtn.classList.add("cancel-btn");
        continueBtn.textContent = "Cancel";

        li.remove();
        sections.confirm.appendChild(li);
    }

    const resetFields = () => {
        Object.values(fields).forEach(field => field.value = "");
    };

    const fields = {
        fName: document.querySelector("#first-name"),
        lName: document.querySelector("#last-name"),
        people: document.querySelector("#people-count"),
        fromDate: document.querySelector("#from-date"),
        days: document.querySelector("#days-count"),
    };

    const sections = {
        preview: document.querySelector(".ticket-info-list"),
        confirm: document.querySelector(".confirm-ticket"),
    };

    const mainDiv = document.querySelector("#main");

    const nextBtn = document.querySelector("#next-btn");
    nextBtn.addEventListener("click", buyTicket);
}