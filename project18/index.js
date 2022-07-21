const result = document.querySelector("#result");
const button = document.querySelector("button");
const body = document.querySelector("button");
button.addEventListener("click", pullCards);
async function shuffleDeck() {
    try {
        const deck = await fetch(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        const shuffledDeck = await deck.json();
        if (!shuffledDeck.success === true) {
            throw "Falha shuffle deck!";
        }

        return shuffledDeck;
    } catch (error) {
        return Promise.reject(error);
    }
}
async function pullCards() {
    try {
        result.innerHTML = ``;
        body.style.cursor = "wait";
        button.disabled = true;
        let cards = [];

        const deck = await shuffleDeck();

        for (let i = 0; i < 5; i++) {
            const card = fetch(
                `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
            ).then((response) => response.json());
            cards.push(await card);
        }
        console.log(cards);
        for (let i = 0; i < cards.length; i++) {
            result.innerHTML += `<img src="${cards[i].cards[0].image}" />`
        }
        body.style.cursor = "default";
        button.disabled = false;
    } catch (error) {
        alert(error);
    }
}
