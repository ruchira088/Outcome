app = require("./app");
cardDeck = app.cardDeck;

testFunction(app.isSameSuit);
testFunction(app.isAdjacentValue);
testFunction(app.isSameValue);
testFunction(app.isSet);


function testFunction(functionValue)
{
	console.log(functionValue.name);

	card_1 = cardDeck.dealCard();
	card_2 = cardDeck.dealCard();

	console.log(card_1);
	console.log(card_2);

	console.log(functionValue(card_1, card_2));
}