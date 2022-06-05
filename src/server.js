const express = require("express");
const app = express();

//Settings
app.set("port", process.env.PORT || 8000);

//Middleware
app.use(express.json()); // use JSON format

//Routes
app.use(require("./routes/nutritionists"));

//Start Server
app.listen(app.get("port"), () => {
  console.log("El servidor está levantado, en el puerto ", app.get("port"));
});
