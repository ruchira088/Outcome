
const SUITS = ["hearts", "spades", "diamonds", "clubs"];
const SHUFFLE_STRENGTH = 10;
const VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

Card = function(suit, value)
{
  return {
      suit: suit,
      value: value,
      getOrderPosition: function()
      {
        return VALUES.indexOf(this.value);
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
        if(VALUES.indexOf(orderedCards[i+1].value) - VALUES.indexOf(orderedCards[i].value) != 1)
        {
            isAdjacent = false;
            break;
        }
    }

    if(!isAdjacent)
    {
        const hasAce = containsAce();

        if(hasAce.hasAce)
        {
            const newCards = cards.slice();
            newCards[hasAce.index].value = "1";

            return isAdjacentValues(newCards);
        }
    }

    function containsAce()
    {
        return cards.reduce((output, card) =>
        {
            if(!output.hasAce && card.value === "ace")
            {
                return {
                    hasAce: true,
                    index: cards.indexOf(card)
                };
            }

            return output;

        }, {
            hasAce: false
        });
    }

    return isAdjacent;
}

function isSet(cards)
{
    return isSameValue(cards) || (isSameSuit(cards) && isAdjacentValues(cards));

}

function findSets(cards, cardsInASet)
{
    var sets = [];
    var cardGroups = splitCards(cards, cardsInASet);

    cardGroups.forEach(function(cardGroup)
        {
            if(isSet(cardGroup))
            {
                sets.push(cardGroup);
            }
        });

    return sets;
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

function isWinner(cards)
{
    var winningCards = hasWinningHand(cards);

    if(winningCards.result)
    {
        return winningCards;
    }

    return hasWinningHand(cards, [4, 3, 2]);
}

function hasWinningHand(cards, groups)
{
    var sets = arguments[2];

    if(!sets)
    {
        sets = [];
        groups = groups || [];
        groups.reverse();
    }

    if(!cards.length)
    {
        return {result: true, cardSets: sets};
    }

    var cardSets = findSets(cards, groups.pop() || 3);

    for(var i=0; i < cardSets.length; i++)
    {
        var currentSets = sets.clone();
        currentSets.push(cardSets[i]);

        var isWinner = hasWinningHand(cards.reject(cardSets[i]), groups.clone(), currentSets);

        if(isWinner.result)
        {
            return isWinner;
        }
    }

    return {result: false};
}

// function hasWinningHand(cards)
// {
//     if(!cards.length)
//     {
//         return true;
//     }

//     var cardSets = findSets(cards, 3);

//     for(var i=0; i < cardSets.length; i++)
//     {
//         if(hasWinningHand(cards.reject(cardSets[i])))
//         {
//             return true;
//         }
//     }

//     return false;
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
    hasWinningHand: hasWinningHand,
    isWinner: isWinner,
    Card: Card
};

