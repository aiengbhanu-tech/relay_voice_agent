import http from 'node:http';import {readFile} from 'node:fs/promises';
const port=Number(process.argv[process.argv.indexOf('--port')+1])||4173;
http.createServer(async(req,res)=>{if(req.url.startsWith('/api/')){res.writeHead(503,{'content-type':'application/json'});res.end(JSON.stringify({error:'API is available on the deployed private workspace.'}));return}res.writeHead(200,{'content-type':'text/html'});res.end(await readFile('src/page.html'))}).listen(port,'0.0.0.0');
