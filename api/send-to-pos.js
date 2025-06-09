export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed');
  }

  const POS_API = 'https://mapwireless.phppointofsale.com/index.php/api/customers';
  const API_KEY = '4w08coc0cssswgcc8c08cks80k4ggogwco040ws8';

  try {
    const response = await fetch(POS_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    return res.status(response.status).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach PHP POS API', detail: err });
  }
}
