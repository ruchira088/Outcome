
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

Array.prototype.clone = function()
{
    return this.filter(function(){ return true;});
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
    
    var isAdjacent = true;

    for(var i = 0; i < orderedCards.length-1; i++)
    {
        if(orderedCards[i+1].value - orderedCards[i].value != 1)
        {
            isAdjacent = false;
            break;
        }
    }

    return isAdjacent;
}

function isSet(cards)
{
    return isSameValue(cards) || (isSameSuit(cards) && isAdjacentValues(cards));

}

function findSets(cards)
{
    var cardGroups = splitCards(cards);

    cardGroups.forEach(function(cardGroup)
        {
            if(isSet(cardGroup))
            {
                console.log(cardGroup);
            }
        });
}

function random(value)
{
    return Math.floor(Math.random() * value);
}

function splitCards(cards, n, cardGroups, groupCards)
{
    cardGroups = cardGroups || [];
    groupCards = groupCards || [];

    if(n)
    {
        cards.forEach(function(card)
        {
            var tempCards = groupCards.clone();
            tempCards.push(card);
            cards = cards.reject([card]);
            splitCards(cards, n-1, cardGroups, tempCards);
        });
    }
    else
    {
        cardGroups.push(groupCards);
    }
    
   return cardGroups;
}

// function splitCards(cards)
// {
//     var tempCards = cards;
//     var cardGroups = [];


//    cards.forEach(function(card)
//     {
//         tempCards = tempCards.reject([card]);
//         var tempCards_2 = tempCards;
        
//         tempCards.forEach(function(card_1)
//             {
//                 tempCards_2 = tempCards_2.reject([card_1]);

//                 tempCards_2.forEach(function(card_2)
//                 {
//                     var cardGroup = [card, card_1, card_2];
//                     cardGroups.push(cardGroup);
//                 });
//             });
//     });

//    return cardGroups;
// }

module.exports = 
{
    cardDeck: cardDeck,
    isSameSuit: isSameSuit,
    isSameValue: isSameValue,
    isAdjacentValues: isAdjacentValues,
    isSet: isSet,
    getLowestCard: getLowestCard,
    splitCards: splitCards,
    findSets: findSets,
    Card: Card
};

