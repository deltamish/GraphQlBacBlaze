require('dotenv').config()

const {
    ApolloServer,
    ApolloError,
    ValidationError
} = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = require('./graphql/typdefs');
const resolver = require('./graphql/resolvers');

let b2 = require('./apis/backblaze');

function progress(args) {
    //  console.log("progress", args);
}

function onInit() {
    //   b2.GetFiles();
    // b2.GetUploadUrl();



}

b2.Init(onInit);
//setTimeout(function () { b2.DownloadfileById("4_z046946b3d0c5e4af7e1d051b_f101e1d935896c761_d20200506_m170205_c003_v0312000_t0011", progress); }, 8000);
//-------------Apollo Server---------------------

const server = new ApolloServer({
    typeDefs,
    resolvers: resolver
});

server.listen(5000).then(res => {
    console.log(`running at ${res.url}`)
})


//----------------------------------------------------