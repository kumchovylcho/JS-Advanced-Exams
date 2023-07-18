window.addEventListener('load', solution);

function solution() {

    function createElement(type,
                           textContent="") {
        const element = document.createElement(type);

        if (textContent) {
            element.textContent = textContent;
        }

        return element;
    }

    function submitData() {
        const [name, email, phone, address, postalCode] = fields;

        if (!name.value || !email.value) {
            return;
        }

        previewList.appendChild(createElement("li", `Full Name: ${name.value}`));
        previewList.appendChild(createElement("li", `Email: ${email.value}`));
        previewList.appendChild(createElement("li", `Phone Number: ${phone.value}`));
        previewList.appendChild(createElement("li", `Address: ${address.value}`));
        previewList.appendChild(createElement("li", `Postal Code: ${postalCode.value}`));

        handleButtonStates(true);
        fields.forEach(field => field.value = "");
    }

    function editData() {
        let [name, email, phone, address, postalCode] = previewList.querySelectorAll("li");
        const [nameField, emailField, phoneField, addressField, postalCodeField] = fields;

        nameField.value = name.textContent.split("Full Name: ")[1];
        emailField.value = email.textContent.split("Email: ")[1];
        phoneField.value = phone.textContent.split("Phone Number: ")[1];
        addressField.value = address.textContent.split("Address: ")[1];
        postalCodeField.value = postalCode.textContent.split("Postal Code: ")[1];

        handleButtonStates(false);
        previewList.innerHTML = "";
    }

    function handleButtonStates(disableSubmitBtn = true) {
        if (disableSubmitBtn) {
            editBtn.disabled = false;
            continueBtn.disabled = false;
            submitBtn.disabled = true;
        }

        else {
            submitBtn.disabled = false;
            editBtn.disabled = true;
            continueBtn.disabled = true;
        }
    }

    const submitBtn = document.querySelector("#submitBTN");
    const editBtn = document.querySelector("#editBTN");
    const continueBtn = document.querySelector("#continueBTN");
    const fields = Array.from(document.querySelectorAll("input")).slice(0, 5);
    const previewList = document.querySelector("#infoPreview");
    const mainDiv = document.querySelector("#block")

    submitBtn.addEventListener("click", submitData);
    editBtn.addEventListener("click", editData);
    continueBtn.addEventListener("click", () => {
        mainDiv.innerHTML = "";
        mainDiv.appendChild(createElement("h3", "Thank you for your reservation!"))
    });
}
