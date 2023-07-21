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

        if (classes.length > 0) {
            element.classList.add(...classes);
        }

        if (listener) {
            element.addEventListener("click", listener);
        }

        return element;
    }

    function addReservation(event) {
        event.preventDefault();

        if (!validFields()) {
            return;
        }

        const li = createElement("li", "", ["info-list"]);

        const article = createElement("article");
        article.appendChild(createElement("h3", `Name: ${fields.fName.value} ${fields.lName.value}`));
        article.appendChild(createElement("p", `From date: ${fields.checkIn.value}`));
        article.appendChild(createElement("p", `To date: ${fields.checkOut.value}`));
        article.appendChild(createElement("p", `For ${fields.guests.value} people`));

        li.appendChild(article);

        li.appendChild(createElement("button", "Edit", ["edit-btn"], submitHandler));
        li.appendChild(createElement("button", "Continue", ["continue-btn"], submitHandler));

        sections.reservations.appendChild(li);

        resetFields();
        nextBtn.disabled = true;
    }

    function submitHandler(event) {
        const btnName = event.target.textContent;

        const map = {
            "Edit": editReservation,
            "Continue": continueReservation,
            "Cancel": cancelReservation,
            "Confirm": confirmReservation,
        }

        map[btnName](event);
    }

    function cancelReservation(event) {
        event.target.parentElement.remove();
        nextBtn.disabled = false;
        sections.finalReservation.textContent = "Cancelled."
        sections.finalReservation.classList.add("reservation-cancelled")
    }

    function confirmReservation(event) {
        event.target.parentElement.remove();
        nextBtn.disabled = false;
        sections.finalReservation.textContent = "Confirmed."
        sections.finalReservation.classList.add("reservation-confirmed")
    }

    function editReservation(event) {
        nextBtn.disabled = false;
        const li = event.target.parentElement;
        const article = li.querySelector("article");

        const [fName, lName] = article.querySelector("h3").textContent.split("Name: ")[1].split(" ");
        const [fromDate, toDate, guests] = article.querySelectorAll("p");

        fields.fName.value = fName;
        fields.lName.value = lName;
        fields.checkIn.value = fromDate.textContent.split("From date: ")[1];
        fields.checkOut.value = toDate.textContent.split("To date: ")[1];
        fields.guests.value = guests.textContent.match(/\d+/g);

        li.remove();
    }

    function continueReservation(event) {
        const li = event.target.parentElement;
        li.remove();

        const [editBtn, continueBtn] = li.querySelectorAll("button");
        editBtn.textContent = "Confirm";
        editBtn.classList.remove("edit-btn");
        editBtn.classList.add("confirm-btn");

        continueBtn.textContent = "Cancel";
        continueBtn.classList.remove("continue-btn");
        continueBtn.classList.add("cancel-btn");

        sections.confirm.appendChild(li);
    }

    const validFields = () => {
        if (Object.values(fields).some(field => !field.value)) {
            return false;
        }

        const [fromYear, fromMonth, fromDay] = fields.checkIn.value.split("-").map(x => Number(x));
        const [toYear, toMonth, toDay] = fields.checkOut.value.split("-").map(x => Number(x));

        if (fromYear > toYear ||
            fromMonth > toMonth ||
            fromDay > toDay) {
            return false;
        }

        return true;
    }

    const resetFields = () => {
        Object.values(fields).forEach(field => field.value = "");
    };

    const fields = {
        fName: document.querySelector("#first-name"),
        lName: document.querySelector("#last-name"),
        checkIn: document.querySelector("#date-in"),
        checkOut: document.querySelector("#date-out"),
        guests: document.querySelector("#people-count"),
    };

    const sections = {
        reservations: document.querySelector(".info-list"),
        confirm: document.querySelector(".confirm-list"),
        finalReservation: document.querySelector("#verification"),
    };

    const nextBtn = document.querySelector("#next-btn");
    nextBtn.addEventListener("click", addReservation);
}
