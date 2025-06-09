export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change "*" to your domain for better security
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle POST request
  if (req.method === "POST") {
    const POS_API_KEY = '4w08coc0cssswgcc8c08cks80k4ggogwco040ws8';
    const POS_API_URL = 'https://mapwireless.phppointofsale.com/index.php/api/customers';

    const payload = {
      first_name: req.body.first_name,
      phone_number: req.body.phone_number,
      comments: req.body.comments
    };

    try {
      const posRes = await fetch(POS_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${POS_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const posData = await posRes.json();

      if (!posRes.ok) {
        return res.status(posRes.status).json({ message: 'POS API failed', detail: posData });
      }

      return res.status(200).json({ message: 'POS success', data: posData });

    } catch (err) {
      console.error('Error sending to POS:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  // Handle all other methods
  return res.status(405).json({ error: "Method not allowed" });
}
