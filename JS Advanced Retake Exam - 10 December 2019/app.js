function solution() {

    function createElement(type,
                           textContent = "",
                           klass = [],
                           id="",
                           listener="") {
        const element = document.createElement(type);

        if (textContent) {
            element.textContent = textContent;
        }

        if (klass.length > 0) {
            klass.forEach(klassName => element.classList.add(klassName));
        }

        if (id) {
            element.id = id;
        }

        if (listener) {
            element.addEventListener("click", listener);
        }

        return element;
    }

    function addGift() {
        allGifts.push(giftField.value);
        const sortedGifts = allGifts.sort((a, b) => a.localeCompare(b));
        giftsList.innerHTML = "";
        giftField.value = "";

        sortedGifts.forEach(name => {
            const newLi = createElement("li", name, ["gift"]);

            newLi.appendChild(createElement("button", "Send", [], "sendButton", handler));
            newLi.appendChild(createElement("button", "Discard", [], "discardButton", handler));

            giftsList.appendChild(newLi);
        })
    }

    function handler(event) {
        const gift = event.target.parentElement;
        const btnOperation = event.target.textContent

        giftsList.removeChild(gift);
        gift.removeChild(gift.lastChild);
        gift.removeChild(gift.lastChild);

        if (btnOperation === "Send") {
            sentGifts.appendChild(gift);
        }

        else {
            discardedGifts.appendChild(gift);
        }

        const itemName = gift.textContent;
        allGifts.splice(allGifts.indexOf(itemName), 1);
    }

    const addBtn = document.querySelector("button");
    const giftField = document.querySelector("input");
    const [giftsList, sentGifts, discardedGifts] = document.querySelectorAll(".card > ul")
    const allGifts = [];

    addBtn.addEventListener("click", addGift);
}