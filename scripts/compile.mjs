import {readFile,writeFile} from 'node:fs/promises';
const html=await readFile('src/page.html','utf8');const server=await readFile('src/server.js','utf8');await writeFile('worker/index.js','const PAGE = '+JSON.stringify(html)+';\n'+server);
