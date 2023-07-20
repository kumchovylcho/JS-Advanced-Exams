function solve() {

    function createElement(type,
                           textContent="",
                           klass="",
                           attrs=null,
                           listener="") {
        const element = document.createElement(type);

        if (textContent) {
            element.textContent = textContent;
        }

        if (klass) {
            element.classList.add(klass);
        }

        if (attrs !== null) {
            for (const [key, value] of Object.entries(attrs)) {
                element.setAttribute(key, value);
            }
        }

        if (listener) {
            element.addEventListener("click", listener);
        }

        return element;
    }

    function addMail(event) {
        event.preventDefault();

        if (Object.values(fields).some(field => !field.value)) {
            return;
        }

        const li = createElement("li");
        li.appendChild(createElement("h4", `Title: ${fields.title.value}`));
        li.appendChild(createElement("h4", `Recipient Name: ${fields.recipient.value}`));
        li.appendChild(createElement("span", fields.message.value));

        const btnDiv = createElement("div", "", "", {id: "list-action"});
        btnDiv.appendChild(createElement("button", "Send", "", {type: "submit", id: "send"}, sendMail));
        btnDiv.appendChild(createElement("button", "Delete", "", {type: "submit", id: "delete"}, deleteMail));

        li.appendChild(btnDiv);
        mailBoxes.list.appendChild(li);

        resetFields(event);
    }

    function sendMail(event) {
        const li = event.target.parentElement.parentElement;
        li.remove();

        const [title, recipientName] = li.querySelectorAll("h4");

        const newLi = createElement("li");
        newLi.appendChild(createElement("span", recipientName.textContent));
        newLi.appendChild(createElement("span", title.textContent));

        const btnDiv = createElement("div", "", "btn");
        btnDiv.appendChild(createElement("button", "Delete", "delete", {type: "submit"}, deleteMail));
        newLi.appendChild(btnDiv);

        mailBoxes.sentList.appendChild(newLi);
    }

    function deleteMail(event) {
        const li = event.target.parentElement.parentElement;
        const mainUlId = li.parentElement.id;
        li.remove();

        if (mainUlId === "list") {
            const [title, recipientName] = li.querySelectorAll("h4");

            const newLi = createElement("li");
            newLi.appendChild(createElement("span", recipientName.textContent));
            newLi.appendChild(createElement("span", title.textContent));

            mailBoxes.deletedList.appendChild(newLi);
        }

        if (!mainUlId) {
            li.removeChild(li.lastChild);
            mailBoxes.deletedList.appendChild(li);
        }
    }

    const fields = {
        recipient: document.querySelector("#recipientName"),
        title: document.querySelector("#title"),
        message: document.querySelector("#message"),
    };

    const buttons = {
        add: document.querySelector("#add"),
        reset: document.querySelector("#reset"),
    };

    const mailBoxes = {
        list: document.querySelector("#list"),
        sentList: document.querySelector(".sent-list"),
        deletedList: document.querySelector(".delete-list"),
    };

    const resetFields = (event) => {
        event.preventDefault();
        Object.values(fields).forEach(field => field.value = "");
    };

    buttons.add.addEventListener("click", addMail);
    buttons.reset.addEventListener("click", resetFields);
}

solve()