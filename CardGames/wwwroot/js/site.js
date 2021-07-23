// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
var deck = new Array();

let playerHandTotal = 0;
let dealerHandTotal = 0;
let playerWinnings = 0;
let playerLosses = 0;
let playerEndScore = 0;
let playerBet = 0;
let startingCredit = 100;
let dealerHasAce;
let playerHasAce;
let dealerWin;
let playerWin;
let newCredit;
let newLoss;
let newWon;
let loss;
let won;

function createDeck() {
    deck = new Array();

    for (let i = 0; i < values.length; i++) {
        for (let x = 0; x < suits.length; x++) {
        
            var weight = parseInt(values[i]);

            if (values[i] === "J" || values[i] === "Q" || values[i] === "K") {
                weight = 10;
            }

            if (values[i] === "A") {
                weight = 11;
            }

            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
    //console.log(deck);
 }

function shuffle() {

    for (let i = 0; i < 500; i++)
    {
        let card1 = Math.floor((Math.random() * deck.length));
        let card2 = Math.floor((Math.random() * deck.length));
        var tempCard = deck[card1];

        deck[card1] = deck[card2];
        deck[card2] = tempCard;
    }
}

function deal() {
    //console.log("inside deal");
    clearCards();
    dealerHandTotal = 0;
    playerHandTotal = 0;

    if (document.getElementById("txtBetAmount") != "") {
        //var currentBet = document.getElementById("txtBetAmount").value;
        //if (currentBet === "" || currentBet === "0") {
        document.getElementById("txtBetAmount").value = 5;
        playerBet = 5;
        //}
    }

    //create & shuffle deck & set beginning credit amount
    setCreditAmount();
    createDeck();
    shuffle();
    
    //player's hand
    for (let i = 0; i < 2; i++)
    {
        var playerCard = deck.pop();
        let entity;

        playerCard.Suit === "Diamonds" ? (entity = "&diams;") : (entity = "&" + playerCard.Suit.toLowerCase() + ";");
        const card = document.createElement("div");
        card.classList.add("card", playerCard.Suit.toLowerCase());
        card.innerHTML = '<span class="card-value-suit top">' + playerCard.Value + entity + "</span>" + '<span class="card-suit">'
            + entity + "</span>" + '<span class="card-value-suit bot">' + playerCard.Value + entity + "</span>";
        document.getElementById("divPlayerCards").appendChild(card);

        playerHandTotal += playerCard.Weight;

        if (playerCard.Value === "A") {
            playerHasAce = true;
        }

        //if player gets 21 on the first hand
        if (playerHandTotal === 21)
        {
            const msg = document.createElement("div");
            msg.classList.add("status-message");
            msg.innerHTML = "<span>Blackjack!</span>";
            document.getElementById("divStatusMessage").appendChild(msg);
            playerWin = true;
            calculatePlayerTotals();
        }

        console.log("player cards:  " + playerCard.Value + ", " + playerCard.Suit + ", " + playerCard.Weight);
    }

    //dealer's hand
    for (let i = 0; i < 2; i++) {
        var dealerCard = deck.pop();
        let entity;

        dealerCard.Suit === "Diamonds" ? (entity = "&diams;") : (entity = "&" + dealerCard.Suit.toLowerCase() + ";");
        const card = document.createElement("div");
        card.classList.add("card", dealerCard.Suit.toLowerCase());
        card.innerHTML = '<span class="card-value-suit top">' + dealerCard.Value + entity + "</span>" + '<span class="card-suit">'
            + entity + "</span>" + '<span class="card-value-suit bot">' + dealerCard.Value + entity + "</span>";
        document.getElementById("divDealerCards").appendChild(card);

        dealerHandTotal += dealerCard.Weight;
        if (dealerCard.Value === "A") {
            dealerHasAce = true;
        }

        //if dealer gets 21 on the first hand
        if (dealerHandTotal === 21) {
            const msg = document.createElement("div");
            msg.classList.add("status-message");
            msg.innerHTML = "<span>Blackjack!</span>";
            document.getElementById("divStatusMessage").appendChild(msg);
            playerWin = true;
            calculatePlayerTotals();
        }

        console.log("dealer cards:  " + dealerCard.Value + ", " + dealerCard.Suit + ", " + dealerCard.Weight);
    }

    console.log("dealerHandTotal = " + dealerHandTotal + " " + "playerHandTotal = " + playerHandTotal);
}

function setCreditAmount() {
    if (document.getElementById("txtCreditAmount") != null) {
        if (document.getElementById("txtCreditAmount").value === "") {
            document.getElementById("txtCreditAmount").value = 100;
        }
    }
}

function clearCards() {
    //remove player & dealer cards from the table
    var divDealer = document.getElementById("divDealerCards");
    var divPlayer = document.getElementById("divStatusMessage");
    var divMessage = document.getElementById("divPlayerCards");

    while (divDealer.firstChild) {
        divDealer.removeChild(divDealer.firstChild);
    }

    while (divPlayer.firstChild) {
        divPlayer.removeChild(divPlayer.firstChild);
    }

    while (divMessage.firstChild) {
        divMessage.removeChild(divMessage.firstChild);
    }

    //setCreditAmount();
    document.getElementById("txtBetAmount").value = 0;
 }

function restartGame() {
    //remove player & dealer cards from the table
    var divDealer = document.getElementById("divDealerCards");
    var divPlayer = document.getElementById("divStatusMessage");
    var divMessage = document.getElementById("divPlayerCards");

    while (divDealer.firstChild) {
        divDealer.removeChild(divDealer.firstChild);
    }

    while (divPlayer.firstChild) {
        divPlayer.removeChild(divPlayer.firstChild);
    }

    while (divMessage.firstChild) {
        divMessage.removeChild(divMessage.firstChild);
    }

    document.getElementById("txtCreditAmount").value = 100;
    document.getElementById("txtBetAmount").value = 0;
    document.getElementById("txtLosses").value = 0;
    document.getElementById("txtWinnings").value = 0;

    //reset variables
    playerHandTotal = 0;
    dealerHandTotal = 0;
    playerWinnings = 0;
    playerLosses = 0;
    playerEndScore = 0;
    playerBet = 0;
    dealerWin = false;
    playerWin = false;

    setCreditAmount();
    createDeck();
    shuffle();

    const msg = document.createElement("div");
    msg.classList.add("status-message");
    msg.innerHTML = "<span>Place Your Bet</span>";
    document.getElementById("divStatusMessage").appendChild(msg);
}

function hitMe() {
    console.log("hit me player hand total: " + playerHandTotal);

    if (playerHandTotal <= 21) {
        //console.log("inside hit me - while");
        
        var playerCard = deck.pop();
        let entity;
        playerCard.Suit === "Diamonds" ? (entity = "&diams;") : (entity = "&" + playerCard.Suit.toLowerCase() + ";");
        const card = document.createElement("div");
        card.classList.add("card", playerCard.Suit.toLowerCase());
        card.innerHTML = '<span class="card-value-suit top">' + playerCard.Value + entity + "</span>" + '<span class="card-suit">'
            + entity + "</span>" + '<span class="card-value-suit bot">' + playerCard.Value + entity + "</span>";
        document.getElementById("divPlayerCards").appendChild(card);

        //console.log("player cards:  " + playerCard.Value + ", " + playerCard.Suit + ", " + playerCard.Weight);

        playerHandTotal += playerCard.Weight;

        if (playerCard.Value === "A") {
            playerHasAce = true;
        }
        else {
            playerHasAce = false;
        }

        if (playerHasAce === true) {
            playerHandTotal -= 10;
        }

        if (playerHandTotal > 21)
        {
            const msg = document.createElement("div");
            msg.classList.add("status-message");
            msg.innerHTML = "<span>You Lose!</span>";
            document.getElementById("divStatusMessage").appendChild(msg);
            playerWin = false;
            dealerWin = true;
            calculatePlayerTotals();
            //break;
        }

        if (playerHandTotal === 21) {
            const msg = document.createElement("div");
            msg.classList.add("status-message");
            msg.innerHTML = "<span>Blackjack!</span>";
            document.getElementById("divStatusMessage").appendChild(msg);
            playerWin = true;
            dealerWin = false;
            calculatePlayerTotals();
            //break;
        }

        //if (playerHandTotal < 21) {
        //    continue;
        //}
    }

    //calculatePlayerTotals();
    console.log("player cards:  " + playerCard.Value + ", " + playerCard.Suit + ", " + playerCard.Weight);
}

function stand() {
    console.log("inside stand & dealer hand total: " + dealerHandTotal);
    //The house hits for hands < 18
    while (dealerHandTotal <= 21 || dealerHandTotal < playerHandTotal) {
        console.log("inside stand while" + " dealerHand= " + dealerHandTotal + "  playerHand= " + playerHandTotal);
        if (playerHandTotal === 21) {
            const msg = document.createElement("div");
            msg.classList.add("status-message");
            msg.innerHTML = "<span>Blackjack!</span>";
            document.getElementById("divStatusMessage").appendChild(msg);
            playerWin = true;
            dealerWin = false;
            calculatePlayerTotals();
            break;
        }

        //if (dealerHandTotal < playerHandTotal || dealerHandTotal === playerHandTotal) {
            var dealerCard = deck.pop();
            console.log("after card pop");
            let entity;
            dealerCard.Suit === "Diamonds" ? (entity = "&diams;") : (entity = "&" + dealerCard.Suit.toLowerCase() + ";");
            const card = document.createElement("div");
            card.classList.add("card", dealerCard.Suit.toLowerCase());
            card.innerHTML = '<span class="card-value-suit top">' + dealerCard.Value + entity + "</span>" + '<span class="card-suit">'
                + entity + "</span>" + '<span class="card-value-suit bot">' + dealerCard.Value + entity + "</span>";
            document.getElementById("divDealerCards").appendChild(card);

            dealerHandTotal += dealerCard.Weight;
            console.log("dealer total: " + dealerHandTotal);

            //checks if dealer holds an ace
            if (dealerCard.Value === "A") {
                dealerHasAce = true;
            }

            //if the dealer hand total is > 11 or if dealer total <= 21 and dealer holds an ace, deduct 10 from
            //the dealerHandTotal so the ace is now worth 1 instead of 11
            if (dealerHandTotal > 11 && dealerHasAce === true) {
                dealerHandTotal -= 10;
            }

        //}

        //if (dealerHandTotal === playerHandTotal) {
        //   continue;
        //}

        if (dealerHandTotal <= 21 && dealerHandTotal > playerHandTotal) {
            
                //house wins - set message
                dealerWin = true;
                playerWin = false;
                const msg = document.createElement("div");
                msg.classList.add("status-message");
                msg.innerHTML = "<span>House Wins</span>";
                document.getElementById("divStatusMessage").appendChild(msg);
                calculatePlayerTotals();
            
        }
 
        if (dealerHandTotal > 21) {
            //house loses - player wins
            playerWin = true;
            dealerWin = false;
            const msg = document.createElement("div");
            msg.classList.add("status-message");
            msg.innerHTML = "<span>House is Over 21 - You Win!</span>";
            document.getElementById("divStatusMessage").appendChild(msg);
            calculatePlayerTotals();
        }
    }

    //console.log("player total: " + playerHandTotal + "   dealer total: " + dealerHandTotal);
    ////winner of game has been set so calculate player totals
    //calculatePlayerTotals();

    //console.log("dealer cards:  " + dealerCard.Value + ", " + dealerCard.Suit + ", " + dealerCard.Weight);
    console.log("end of stand");
}

function calculatePlayerTotals() {
    let credit = parseInt(document.getElementById("txtCreditAmount").value);
    let bet = parseInt(document.getElementById("txtBetAmount").value);

    if (document.getElementById("txtLosses").value === "") {
        loss = 0;
    }
    else {
        loss = parseInt(document.getElementById("txtLosses").value);
    }

    if (document.getElementById("txtWinnings").value === "") {
        won = 0;
    }
    else {
        won = parseInt(document.getElementById("txtWinnings").value);
    }

    if (playerWin === true) {
        newCredit = credit + bet;
        newWon = won + bet;
        newLoss = loss;
    }

    if (dealerWin === true) {
        newCredit = credit - bet;
        newWon = won;
        newLoss = loss + bet;
    }

    document.getElementById("txtCreditAmount").value = newCredit;
    document.getElementById("txtBetAmount").value = 0;
    document.getElementById("txtLosses").value = newLoss;
    document.getElementById("txtWinnings").value = newWon;

    if (newCredit <= 0) {
        const msg = document.createElement("div");
        msg.classList.add("status-message");
        msg.innerHTML = "<span>House is Over 21 - You Win!</span>";
        document.getElementById("divStatusMessage").appendChild(msg);

        msg.innerHTML = "<span>You have no more credit. Game will restart.</span>";
        document.getElementById("divStatusMessage").appendChild(msg);
        restartGame();
    }
}

function increaseBet() {
    playerBet += 5;
    console.log(playerBet);
 
    if (document.getElementById("txtBetAmount").value != "") {
        document.getElementById("txtBetAmount").value = playerBet;
    }

    if (playerBet > newCredit) {
        const msg = document.createElement("div");
        msg.classList.add("status-message");
        msg.innerHTML = "<span>Your bet is more than your credit. Decrease your bet.</span>";
        document.getElementById("divStatusMessage").appendChild(msg);
    }
}

function decreaseBet() {
    playerBet -= 5;
    console.log(playerBet);
    
    if (document.getElementById("txtBetAmount").value != "") {
        document.getElementById("txtBetAmount").value = playerBet;
    }

    let totalCredit = newCredit - playerBet;

    if (totalCredit < 0) {
        const msg = document.createElement("div");
        msg.classList.add("status-message");
        msg.innerHTML = "<span>You don't have enough credit to cover your bet. Decrease your bet.</span>";
        document.getElementById("divStatusMessage").appendChild(msg);
    }
}
