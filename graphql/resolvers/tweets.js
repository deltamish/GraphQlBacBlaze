const firestore = require('../../apis/firestore');

module.exports = {
    Query: {
        tweets: async () => {
            const response = await firestore.firestore().collection('tweets').get()
            console.log(response);
            console.log(`EXISTS `)
            const tweetsData = response.docs.map(tweet => { console.log(tweet); return tweet.data() });
            console.log("TWEETs");
            console.log(tweetsData);


            return tweetsData;
        }

    },

    Mutation: {
        async pushTweet(parent, args, context, info) {
            console.log(args.tweet);
            let data = { tweet: args.tweet }
            const response = await firestore.firestore().collection('tweets').doc().set(data);
            console.log(response)
        }

    }
}