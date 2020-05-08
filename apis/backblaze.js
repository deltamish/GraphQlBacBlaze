var btoa = require('btoa');
const B2 = require('backblaze-b2');
var fs = require('fs');


//------------------B2 Creds-----------------------------------
const b2 = new B2({
    applicationKeyId: process.env.b2AppId, // or accountId: 'accountId'
    applicationKey: process.env.b2AppKey// or masterApplicationKey
});

//Global varaibles for bucket and its id
let bucketID = "";
let bucket = null;

module.exports.Init = async function (onInitialize) {
    try {
        const authresponse = await b2.authorize(); // must authorize first
        console.log("auhtResponse", authresponse);
        let response = await b2.getBucket({ bucketName: 'vidvaanh' });
        console.log(response.data);
        bucket = response.data.buckets.find(bucket => bucket.bucketName == 'vidvaanh');
        bucketID = bucket.bucketId;
        onInitialize();
    } catch (err) {
        console.log('Error getting bucket:', err);
    }
}

module.exports.GetFiles = async function (fileStartName = "") {
    try {
        await b2.authorize(); // must authorize first
        const response = await b2.listFileNames({
            bucketId: bucketID,
            startFileName: '',
            maxFileCount: 100,
            delimiter: '',
            prefix: ''
            // ...common arguments (optional)
        });

        console.log(response.data);
    } catch (err) {
        console.log('Error getting bucket:', err);
    }
}

async function GetUploadUrl() {
    try {
        await b2.authorize();
        const response = await b2.getUploadUrl({
            bucketId: bucketID
            // ...common arguments (optional)
        });

        const { uploadUrl, authorizationToken } = response.data;
        console.log(response.data);
        return {
            uploadUrl,
            authToken: authorizationToken
        }
    } catch (err) {
        console.log('Error getting bucket:', err);
    }
}

async function DownloadfileById(id) {
    //4_z046946b3d0c5e4af7e1d051b_f101e1d935896c761_d20200506_m170205_c003_v0312000_t0011
    try {
        //await b2.authorize();
        const response = await b2.downloadFileById({
            fileId: id,
            responseType: 'stream', // options are as in axios: 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            onDownloadProgress: (event) => { }  // progress monitoring
            // ...common arguments (optional)
        });  //
        var ipstream = response.data;
        //  var writerStream = fs.createWriteStream('output.pdf');

        console.log("Downloaded file ", response.data);
        return {
            fileId: id,
            fileStream: ipstream
        }

    } catch (err) {
        console.log('Error getting bucket:', err);
        throw err;
    }
}

module.exports.GetUploadUrl = GetUploadUrl;
module.exports.DownloadfileById = DownloadfileById;