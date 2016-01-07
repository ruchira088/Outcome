var app = require("express")();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", function(request, response)
	{
		response.send(request.body);
	});

app.listen(3001);