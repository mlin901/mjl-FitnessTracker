var express = require("express");
var mongoose = require("mongoose");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});
// From https://stackoverflow.com/questions/14183611/mongoose-always-returning-an-empty-array-nodejs
db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback(){
    console.log("CONNECTED");
});


// routes
app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));


app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
