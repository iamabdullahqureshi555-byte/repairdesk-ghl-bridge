module.exports = (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    res.status(400).send("No authorization code received.");
    return;
  }

  console.log("Received authorization code:", code);
  res.status(200).send(
    "Authorization code received successfully. You can close this tab. (code: " + code + ")"
  );
};
