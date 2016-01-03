
const SUITS = ["Hearts", "Spades", "Diamonds", "Clubs"];
const SHUFFLE_STRENGTH = 10;
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

Card = function(suit, value)
{
  return {
      suit: suit,
      value: value,
      getOrderPosition: function()
      {
        return VALUES.indexOf(value);
      }
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

Array.prototype.reject = function(values)
{
    return this.filter(function(value)
    {
        return values.indexOf(value) == -1;
    });

};

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

function isSameSuit(card_1, card_2, card_3)
{
    var suit = card_1.suit;

    return card_2.suit === suit && card_3.suit === suit;
}

function isSameValue(card_1, card_2, card_3)
{
    var value = card_1.value;

    return card_2.value === value && card_3.value === value;
}

function getLowestCard(cards)
{
    var lowestCard = null;

    cards.forEach(function(card)
        {
            lowestCard = lowestCard || card;

            if(lowestCard.getOrderPosition() > card.getOrderPosition())
            {
                lowestCard = card;
            }
        });

    return lowestCard;
}

function isAdjacentValue(card_1, card_2, card_3)
{
    var cards = [card_1, card_2, card_3];

    var low = getLowestCard(cards);
    cards = cards.reject([low]);

    var mid = getLowestCard(cards);
    cards = cards.reject([mid]);

    var high = cards[0];

    return high.getOrderPosition() - mid.getOrderPosition() == 1 && mid.getOrderPosition() - low.getOrderPosition() == 1;
}

function isSet(card_1, card_2, card_3)
{
    return isSameValue(card_1, card_2, card_3) || (isSameSuit(card_1, card_2, card_3) && isAdjacentValue(card_1, card_2, card_3));

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
    isSet: isSet,
    getLowestCard: getLowestCard,
    Card: Card
};

