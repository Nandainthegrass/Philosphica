import express from "express";
import dotenv from "dotenv";
import logger from "./logger.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), "../public")));
app.use(express.json());
app.use((req, res, next) => {
  logger(req);
  next();
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

async function getQuotes() {
  const response = await fetch(
    "https://philosophy-quotes-api.glitch.me/quotes"
  );
  if (response.ok) {
    const quotes = await response.json();
    quotes.forEach((quote, index) => {
      console.log(`Quote ${index + 1}: ${quote.philosophy}`);
    });
  } else {
    console.log("An error occured!");
  }
}
getQuotes();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
