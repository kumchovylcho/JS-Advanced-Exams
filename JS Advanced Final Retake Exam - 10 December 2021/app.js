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

    function addOrder() {
        if (!fields.description.value || !fields.clientName.value || !fields.clientPhone.value) {
            return;
        }

        const container = createElement("div", "", "container");
        container.appendChild(createElement("h2", `Product type for repair: ${fields.product.value}`));
        container.appendChild(createElement("h3", `Client information: ${fields.clientName.value}, ${fields.clientPhone.value}`));
        container.appendChild(createElement("h4", `Description of the problem: ${fields.description.value}`));
        container.appendChild(createElement("button", "Start repair", "start-btn", startRepair));

        const finishBtn = createElement("button", "Finish repair", "finish-btn", finishRepair);
        finishBtn.disabled = true;
        container.appendChild(finishBtn);

        Object.values(fields).forEach(field => field.value = "");
        sections.orders.appendChild(container);
    }

    function startRepair(event) {
        const repairBtn = event.target;

        const finishBtn = event.target.parentElement.querySelector(".finish-btn");
        finishBtn.disabled = false;
        repairBtn.disabled = true;
    }

    function finishRepair(event) {
        const div = event.target.parentElement;

        div.removeChild(div.lastChild);
        div.removeChild(div.lastChild);

        sections.finishedOrders.appendChild(div);
    }

    const fields = {
        product: document.querySelector("#type-product"),
        description: document.querySelector("#description"),
        clientName: document.querySelector("#client-name"),
        clientPhone: document.querySelector("#client-phone")
    };

    const sections = {
        orders: document.querySelector("#received-orders"),
        finishedOrders: document.querySelector("#completed-orders"),
    }

    const [sendBtn, clearBtn] = document.querySelectorAll("button");

    sendBtn.addEventListener("click", addOrder);
    clearBtn.addEventListener("click", () => {
        Array.from(sections.finishedOrders.querySelectorAll(".container")).forEach(div => div.remove());
    });
}

