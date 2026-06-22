const axios = require("axios");
module.exports = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    res.status(400).send("No authorization code received.");
    return;
  }
  try {
    const response = await axios.post(
      "https://api.repairdesk.co/api/web/v1/oauth2/token",
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REPAIRDESK_REDIRECT_URI,
        client_id: process.env.REPAIRDESK_CLIENT_ID,
        client_secret: process.env.REPAIRDESK_CLIENT_SECRET,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("FULL RESPONSE:", JSON.stringify(response.data));
    const { access_token, refresh_token, expires_in } = response.data.data;
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    res.status(200).send(
      "Token exchange successful! Access token received (expires in " +
        expires_in +
        " seconds). Check Vercel logs for details."
    );
  } catch (error) {
    console.error("Token exchange failed:", error.response?.data || error.message);
    res.status(500).send(
      "Token exchange failed: " + JSON.stringify(error.response?.data || error.message)
    );
  }
};
