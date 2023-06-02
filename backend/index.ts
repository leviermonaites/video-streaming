import { Buffer } from 'node:buffer';
import { createReadStream } from 'node:fs'
import { createServer } from 'node:http';
import * as fs from 'node:fs';

createServer({}, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Max-Age', 2592000);
  console.log('new req')
  // res.setHeader('Content-Type', `video/mp4`);
  const byteOffset = (parseInt(req.headers['byte-offset'] as string | undefined ?? '0'));
  const start = byteOffset;
  const end = byteOffset + 1024;
  const videoReadStream = createReadStream('./video.mp4');
  videoReadStream.on("data", (chunk) => {
    const stat = fs.statSync('video.mp4');
    const base64Chunk = Buffer.from(chunk).toString('base64url');
    // console.log(base64Chunk);

    // res.setHeader('Content-Range', `bytes ${byteOffset}-${byteOffset + 1024}/${stat.size}`);
    // res.setHeader('Content-Length', end - start);
    // res.setHeader('Accept-Ranges', `bytes`);
    return base64Chunk;
  }).pipe(res)
  // videoReadStream.pipe(res)
  // console.log(buffer);
}).listen(8000);