
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

function isSameSuit(cards)
{
    return isSame(cards, "suit");
}

function isSameValue(cards)
{
    return isSame(cards, "value");
}

function isSame(cards, attribute)
{
    var isSame = true;

    if(cards.length)
    {
        var value = cards[0][attribute];

        cards.forEach(function(card)
        {
            if(value != card[attribute])
            {
                isSame = false;
                return isSame;
            }
        });
    }

    return isSame;
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

function orderCardList(cards, orderedList)
{
    orderedList = orderedList || [];

    if(cards.length)
    {
        var lowestCard = getLowestCard(cards);
        orderedList.push(lowestCard);

        cards = cards.reject([lowestCard]);
        orderCardList(cards, orderedList);
    }

    return orderedList;
}

function isAdjacentValues(cards)
{
    var orderedCards = orderCardList(cards);
    
    var isAdjacentValue = true;

    for(var i = 0; i < orderedCards.length-1; i++)
    {
        if(orderedCards[i+1].value - orderedCards[i].value != 1)
        {
            isAdjacentValue = false;
            break;
        }
    }

    return isAdjacentValue;

}

function isSet(card_1, card_2, card_3)
{
    return isSameValue(card_1, card_2, card_3) || (isSameSuit(card_1, card_2, card_3) && isAdjacentValue(card_1, card_2, card_3));

}

function random(value)
{
    return Math.floor(Math.random() * value);
}

module.exports = 
{
    cardDeck: cardDeck,
    isSameSuit: isSameSuit,
    isSameValue: isSameValue,
    isAdjacentValues: isAdjacentValues,
    isSet: isSet,
    getLowestCard: getLowestCard,
    Card: Card
};

