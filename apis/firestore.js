//--------------------Firebase --------------------------
var admin = require("firebase-admin");
var serviceAccount = require("../vidvaanh-firebase-adminsdk-kj0x3-d64688a62a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vidvaanh.firebaseio.com"
});

const app = admin;

module.exports = app;
//------------------------------------------------