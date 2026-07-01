const http = require('http');
const fs = require('fs');
const path = require('path');
const base = 'c:\\Users\\bethe\\Documents\\클로드\\아이봄';
http.createServer((req, res) => {
  let f = path.join(base, req.url.split('?')[0]);
  if (f.endsWith('\\') || f === base) f = path.join(base, 'index.html');
  const ext = path.extname(f);
  const type = {'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'}[ext] || 'text/plain';
  fs.readFile(f,(err,data)=>{
    if(err){ res.writeHead(404); res.end('not found'); }
    else { res.writeHead(200,{'Content-Type':type}); res.end(data); }
  });
}).listen(8090, () => { process.stdout.write('READY\n'); });
