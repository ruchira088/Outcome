app = require("./app");
Card = app.Card;
cardDeck = app.cardDeck;

assert = require("assert");

var card_5H = Card("Hearts", "5");
var card_6H = Card("Hearts", "6");
var card_7H = Card("Hearts", "7");

var card_3C = Card("Clubs", "3");
var card_4C = Card("Clubs", "4");
var card_5C = Card("Clubs", "5");

var card_2S = Card("Spades", "2");
var card_5S = Card("Spades", "5");
var card_9S = Card("Spades", "9"); 

var card_6D = Card("Diamonds", "6");
var card_8D = Card("Diamonds", "8");
var card_KD = Card("Diamonds", "King"); 

genericFail = function(functionValue)
{
	assert.equal(functionValue([card_2S, card_5S, card_8D]), false);
	assert.equal(functionValue([card_5C, card_6H, card_KD]), false);
}

isSameSuit = app.isSameSuit;

describe(isSameSuit.name, function()
	{
		it("The card suits are equal.", function()
		{

			assert.equal(isSameSuit([card_2S, card_5S, card_9S]), true);
			assert.equal(isSameSuit([card_5H, card_6H, card_7H]), true);
		});

		it("The card suits are NOT equal.", function()
		{
			genericFail(isSameSuit);
		});
	});

isSameValue = app.isSameValue;

describe(isSameValue.name, function()
	{
		it("The card values are equal.", function()
		{

			assert.equal(isSameValue([card_5H, card_5S, card_5C]), true);
		});

		it("The card values are NOT equal.", function()
		{
			genericFail(isSameValue);
		});
	});

isAdjacentValues = app.isAdjacentValues;

describe(isAdjacentValues.name, function()
	{
		it("The card values are adjacent.", function()
		{

			assert.equal(isAdjacentValues([card_5H, card_7H, card_6H]), true);
			assert.equal(isAdjacentValues([card_8D, card_9S, card_7H]), true);
			assert.equal(isAdjacentValues([card_2S, card_3C, card_4C]), true);
			assert.equal(isAdjacentValues([card_8D, card_6D, card_7H]), true);
		});

		it("The card values are NOT adjacent.", function()
		{
			genericFail(isAdjacentValues);
		});
	});