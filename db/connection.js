const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://soban:7QGXDUrADaOSjGBF@cluster0.ln9ys.mongodb.net/labTerminal?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((error) => {
    console.log("Error while connecting to Database");
    console.log(error.message);
  });