var app = require("express")();
var bodyParser = require("body-parser");
var Card = require("./app").Card;
var isWinner = require("./app").isWinner;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", function(request, response)
	{
		var cards = request.body.cards.map(function(card)
			{
				var cardValues = card.split("_");
				return Card(cardValues[1], cardValues[0]);
			});

		var outcome = JSON.stringify(isWinner(cards));
		response.end(outcome);
	});

app.listen(3001);

