import crypto from "node:crypto";

// built in nodejs module

// security related tasks
// creating random UUID, IDs
// creating secure token
// hashing data
// to verify of the data was not changed
// encrypt/decrypt


// crypto.randomUUID

// unique ID
// user id, order id, session id


const requestId = crypto.randomUUID();

console.log(requestId);


// crypto.randomBytes

// password reset token
// email verification
// session secret, api key


// 32 char string
const resetToken = crypto.randomBytes(16).toString('hex');
console.log(resetToken);


// crypto.createHash
// hello -> hash
// hash -> hello

const text = "hello node"

const hash = crypto.createHash("sha256").update(text).digest("hex");
console.log(hash);


// crypto.createHmac
// normal hash : data -> hash

//HMAC : data + secret -> signed hash

// uses in webhook
// signed token

const secretKey = "my-super-secret-key";
const message = "user_id=1";

const signature = crypto.createHmac("sha256", secretKey).update(message).digest("hex");
console.log(signature);


const signatureVerify = crypto.createHmac("sha256", secretKey).update(message).digest("hex");
console.log("signature is valid and matching", signature === signatureVerify);