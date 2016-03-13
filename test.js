app = require("./app");
Card = app.Card;
cardDeck = app.cardDeck;

assert = require("assert");

var card_5H = Card("hearts", "5");
var card_6H = Card("hearts", "6");
var card_7H = Card("hearts", "7");

var card_AC = Card("clubs", "ace");
var card_2C = Card("clubs", "2");
var card_3C = Card("clubs", "3");
var card_4C = Card("clubs", "4");
var card_5C = Card("clubs", "5");

var card_AS = Card("spades", "ace");
var card_2S = Card("spades", "2");
var card_5S = Card("spades", "5");
var card_9S = Card("spades", "9");
var card_10S = Card("spades", "10");

var card_6D = Card("diamonds", "6");
var card_7D = Card("diamonds", "7");
var card_8D = Card("diamonds", "8");
var card_JD = Card("diamonds", "jack");
var card_QD = Card("diamonds", "queen");
var card_KD = Card("diamonds", "king"); 

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
			assert.equal(isAdjacentValues([card_JD, card_KD, card_QD]), true);
			assert.equal(isAdjacentValues([card_8D, card_9S, card_7H]), true);
			assert.equal(isAdjacentValues([card_2S, card_3C, card_4C, card_5C]), true);
			assert.equal(isAdjacentValues([card_AC, card_2S, card_3C]), true);
			assert.equal(isAdjacentValues([
				card_AC, card_2S, card_3C, card_4C, card_5C, card_6D, card_7H, card_8D, card_9S, card_10S,
				card_JD, card_QD, card_KD, card_AS
			]), true);
			assert.equal(isAdjacentValues([card_AC, card_2S, card_KD]), false);
			assert.equal(isAdjacentValues([card_8D, card_6D, card_7H]), true);
		});

		it("The card values are NOT adjacent.", function()
		{
			genericFail(isAdjacentValues);
		});
	});


describe(factorial.name, function()
	{
		it("Verifying factorial output", function()
			{
				assert.equal(factorial(0), 1);
				assert.equal(factorial(1), 1);
				assert.equal(factorial(2), 2);
				assert.equal(factorial(3), 6);
				assert.equal(factorial(4), 24);
				assert.equal(factorial(5), 120);
				assert.equal(factorial(6), 720);

			});
	});

splitCards = app.splitCards;

describe(splitCards.name, function()
	{
		it("Verifying the correct number of groups", function()
		{
			var cards = [card_2S, card_5S, card_9S, card_5H, card_6H, card_4C];

			assert.equal(splitCards(cards, 3).length, permutations(cards.length, 3));

			cards.push(card_3C);
			assert.equal(splitCards(cards, 3).length, permutations(cards.length, 3));

			cards.push(card_KD);
			assert.equal(splitCards(cards, 3).length, permutations(cards.length, 3));

			cards.push(card_6D);
			assert.equal(splitCards(cards, 4).length, permutations(cards.length, 4));

			cards.push(card_8D);
			assert.equal(splitCards(cards, 2).length, permutations(cards.length, 2));

			cards.push(card_2C);
			assert.equal(splitCards(cards, 6).length, permutations(cards.length, 6));

			cards.push(card_7H);
			assert.equal(splitCards(cards, 5).length, permutations(cards.length, 5));
		});
	});

findSets = app.findSets;

describe(findSets.name, function()
	{
		it("Finding sets from an array of cards", function()
			{
				var cards = [card_2S, card_2C, card_5S, card_9S, card_5H, card_6H, card_4C, card_7H, card_5C, card_3C];
				assert.equal(findSets(cards, 3).length, 4);
				assert.equal(findSets(cards, 4).length, 1);
			});
	});

hasWinningHand = app.hasWinningHand;

describe(hasWinningHand.name, function()
	{
		it("Checking for winning hands", function()
			{
				var cards = [card_5S, card_5H, card_5C];
				assert(hasWinningHand(cards, [3]).result, "This is a winning hand.");

				cards = [card_5C, card_6H, card_3C, card_7H, card_4C, card_5H];
				assert(hasWinningHand(cards).result, "This is a winning hand.");

				cards = [card_5C, card_6H, card_3C, card_7H, card_4C, card_5H, card_2C];
				assert(hasWinningHand(cards, [4, 3]).result, "This is a winning hand.");

			 	cards = [card_5H, card_6H, card_7H, card_3C, card_4C, card_KD];
				assert(!hasWinningHand(cards).result, "This is NOT a winning hand.");
			});
	});

isWinner = app.isWinner;

describe(isWinner.name, function()
	{
		it("Checking for a winner", function()
			{
				var cards = [card_AC, card_2C, card_3C, card_5H, card_7H, card_6H, card_JD, card_KD, card_QD];
				var winner = isWinner(cards);
				assert(winner.result, "This is a winner");

				cards = [card_5C, card_6H, card_7D, card_3C, card_7H, card_4C, card_5H, card_2C, card_6D];
				assert(isWinner(cards).result, "This is a winner");

				cards = [card_5C, card_6H, card_7D, card_3C, card_7H, card_4C, card_5H, card_8D, card_6D];
				assert(isWinner(cards).result, "This is a winner");

				cards = [card_5C, card_6H, card_7D, card_3C, card_7H, card_4C, card_5H, card_2C, card_KD];
				assert(!isWinner(cards).result, "This is NOT a winner");
			});
	});

function permutations(n, k)
{
	return factorial(n)/(factorial(n-k)*factorial(k));
}

function factorial(n)
{
	if(!n)
	{
		return 1;
	}

	return n * factorial(n-1); 
}

