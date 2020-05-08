const tweets = require('./tweets');
const books = require('./books');
module.exports = {
    Query: {
        init: () => "Hewllo",
        user: () => {
            return {
                id: "Karhik",
                name: "sdsdsd",
                age: 45
            }

        },
        ...tweets.Query,
        ...books.Query
    },

    Mutation: {
        ...tweets.Mutation,
        //...books.Mutation
    }
}