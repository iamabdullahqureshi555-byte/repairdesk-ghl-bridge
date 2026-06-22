const express = require("express");
const app = express();

// Health check route — confirms the server is alive
app.get("/", (req, res) => {
  res.send("RepairDesk <-> GHL Bridge is running ✅");
});

// This is the placeholder callback route.
// RepairDesk will redirect here after a user approves access.
// Right now it just shows the code it received — we'll upgrade
// this in the next phase to actually exchange it for tokens.
app.get("/callback", (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send("No authorization code received.");
  }

  console.log("Received authorization code:", code);
  res.send(
    `Authorization code received successfully. You can close this tab. (code: ${code})`
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
