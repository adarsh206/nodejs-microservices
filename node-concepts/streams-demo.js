//streams are also objects that let you read data from a source or write data to a destination in continuous fashion
//types -> readable, writable, duplex, transform
// duplex -> can be used for both read and write (TCP socket)
// transform -> zlib streams or compression gzip
//uses -> handling files, network communications, data compression

const fs = require("fs");
const zlib = require("zlib"); // compression gzip
const crypto = require("crypto");
const { Transform } = require("stream");

class EncryptStream extends Transform {
    constructor(key, vector){
        super();
        this.key = key;
        this.vector = vector;
    }


_transform(chunk, encoding, callback){
    const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.vector);
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]); // encrypt the chunk data
    this.push(encrypted); // push encrypted data to readable side
    callback();
    
    }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

const readableStream = fs.createReadStream("input.txt");

// new gzip object to compress the stream of data
const gzipStream = zlib.createGzip();

const encryptStream = new EncryptStream(key, vector);

const writableStream = fs.createWriteStream("output.txt.gz.enc");

// read -> compress -> encrypt -> write
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);

console.log("Streaming -> compressing -> writing data");


// piece by piece
// not loading the data everything at once
// read large files
// upload files
// downloading files
// video/audio processing
// compression

import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
// CHUNKS

// here is my full 500mb file
// here is chunk 1
// here is chunk 2
// here is chunk 3
// here is chunk 4
// here is chunk 5

// memory efficient

//stream types
// readable stream - source of data
// writable stream - destination where the data is written
// transform stream - read the data, change it and pass that forward


const readableStream = Readable.from([
    "hello ",
    "from ",
    "node.js ",
    "streams"
])

// callback(error, result)

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback){
        const text = chunk.toString();

        callback(null, text.toUpperCase())
    }
})

const writableStream = new Writable({
    write(chunk, encoding, callback){
        console.log('received chunk', chunk.toString());

        callback()
    }
})


async function main() : Promise<void>{
    try {
        
        await pipeline(readableStream, uppercaseTransform, writableStream);
        console.log("Stream completed");

    } catch (error) {
        const msg = error instanceof Error ? error.message : "unknown error"
        console.error("stream failed", msg);
    }
}


main();