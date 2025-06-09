export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://crcwireless.com"); // 👈 replace * with your actual domain
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const POS_API_URL = `https://mapwireless.phppointofsale.com/index.php/api/v1/customers?key=s8o088s48g4w0ks88sw8okwsco4o88o004k0cw4g`;

    const payload = {
      first_name: req.body.first_name,
      phone_number: req.body.phone_number,
      comments: req.body.comments
    };

    try {
      const posRes = await fetch(POS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const contentType = posRes.headers.get('content-type');
      const responseBody = contentType?.includes('application/json')
        ? await posRes.json()
        : await posRes.text();

      if (!posRes.ok) {
        return res.status(posRes.status).json({
          message: 'POS API failed',
          detail: responseBody
        });
      }

      return res.status(200).json({ message: 'POS success', data: responseBody });

    } catch (err) {
      console.error('Error sending to POS:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
