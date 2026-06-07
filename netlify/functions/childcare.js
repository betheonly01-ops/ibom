exports.handler = async (event) => {
  const arcode = event.queryStringParameters?.arcode || '11440';
  const key = '331c32628aec465da2d3a695863ac314';
  const apiUrl = `http://api.childcare.go.kr/mediate/rest/cpmsapi030/cpmsapi030/request?key=${key}&arcode=${arcode}&stcode=`;

  try {
    const res = await fetch(apiUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const xml = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: xml
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
