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

    function hireWorker(event) {
        event.preventDefault();

        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        const row = createElement("tr");
        row.appendChild(createElement("td", fields.fname.value));
        row.appendChild(createElement("td", fields.lname.value));
        row.appendChild(createElement("td", fields.email.value));
        row.appendChild(createElement("td", fields.birth.value));
        row.appendChild(createElement("td", fields.position.value));
        row.appendChild(createElement("td", fields.salary.value));

        const btnsTd = createElement("td");
        btnsTd.appendChild(createElement("button", "Fired", "fired", fireWorker));
        btnsTd.appendChild(createElement("button", "Edit", "edit", editWorker));
        row.appendChild(btnsTd);

        tbody.appendChild(row);

        salarySum.textContent = (Number(salarySum.textContent) + Number(fields.salary.value)).toFixed(2);
        Object.values(fields).forEach(field => field.value = "");
    }

    function fireWorker(event) {
        const row = event.target.parentElement.parentElement;
        const salary = Array.from(row.querySelectorAll("td"))[5];

        salarySum.textContent = (Number(salarySum.textContent) - Number(salary.textContent)).toFixed(2);
        row.remove();
    }

    function editWorker(event) {
        const row = event.target.parentElement.parentElement;
        const data = Array.from(row.querySelectorAll("td")).slice(0, 6);

        Object.values(fields).forEach((field, index) => {
            field.value = data[index].textContent;
        });

        salarySum.textContent = (Number(salarySum.textContent) - Number(fields.salary.value)).toFixed(2);
        row.remove();
    }

    const fields = {
        fname: document.querySelector("#fname"),
        lname: document.querySelector("#lname"),
        email: document.querySelector("#email"),
        birth: document.querySelector("#birth"),
        position: document.querySelector("#position"),
        salary: document.querySelector("#salary"),
    };

    const salarySum = document.querySelector("#sum");
    const tbody = document.querySelector("#tbody");
    const hireBtn = document.querySelector("#add-worker");
    hireBtn.addEventListener("click", hireWorker);

}
solve();