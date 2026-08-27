const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// The password lives only here, server-side. It is never sent to the client.
const PASSWORD = process.env.SITE_PASSWORD || "Helloworld@";

// No rate limiting, no lockouts, no attempt counting — unlimited guesses by design.
app.post("/api/check-password", (req, res) => {
  const guess = (req.body && req.body.guess) || "";
  const correct = guess === PASSWORD;
  res.json({ correct });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Password guesser running at http://localhost:${PORT}`);
});
