
const SUITS = ["Hearts", "Spades", "Diamonds", "Clubs"];
const SHUFFLE_STRENGTH = 10;
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

Card = function(suit, value)
{
  return {
      suit: suit,
      value: value
  };
};

var cardDeck = {};

cardDeck.cards = SUITS.reduce(function(deck, suit)
{
    VALUES.reduce(function(deck, value)
    {
        deck.push(Card(suit, value));
        return deck;

    }, deck);

    return deck;
}, []);

cardDeck.shuffle = function(strength)
{
    strength =  strength || SHUFFLE_STRENGTH;

    if(strength > 1)
    {
        var numberOfCards = cardDeck.cards.length;

        cardDeck.cards.forEach(function (card) {
            var randomValue = random(numberOfCards);

            var tempCard = cardDeck.cards[randomValue];
            cardDeck.cards[randomValue] = card;
            cardDeck.cards[cardDeck.cards.indexOf(card)] = tempCard;
        });

        cardDeck.shuffle(strength-1);
    }
};

cardDeck.dealCard = function()
{
    return cardDeck.cards.pop();
}

function isSameSuit(card_1, card_2)
{
    return card_1.suit === card_2.suit;
}

function isSameValue(card_1, card_2)
{
    return card_1.value === card_2.value;
}

function isAdjacentValue(card_1, card_2)
{
    return Math.abs(VALUES.indexOf(card_1.value) - VALUES.indexOf(card_2.value)) === 1;
}

function isSet(card_1, card_2)
{
    return isSameValue(card_1, card_2) || (isSameSuit(card_1, card_2) && isAdjacentValue(card_1, card_2));

}

function random(value)
{
    return Math.floor(Math.random() * value);
}

//cardDeck.shuffle();

//checkSet(cardDeck.dealCard(), cardDeck.dealCard());

module.exports = 
{
    cardDeck: cardDeck,
    isSameSuit: isSameSuit,
    isSameValue: isSameValue,
    isAdjacentValue: isAdjacentValue,
    isSet: isSet
};

