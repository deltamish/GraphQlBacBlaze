const { gql } = require('apollo-server');

module.exports = gql`
type UserData{
    id:ID!
    name:String!,
    age:Int!
}
type FileData{
    fileId:String!,
    fileStream:Int! #// <----- this is the stream go to resolvers/books.js line 23 , apis/bacblaze.js line 77
}
type Tweet{
    user:String,
    tweet:String,
}

type UploadToken{
    uploadUrl:String!,
    authToken:String!
}

type Query{
    init:String,
    user:UserData!,
    tweets:[Tweet],
    uploadToken:UploadToken
    
   
}

type Mutation{
    pushTweet(tweet:String):Int!,
   # downloadFile(id:String):FileData!
}


`

