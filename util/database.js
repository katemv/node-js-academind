const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mvkatt:rZFoWqYyFxJTpPjs@cluster0.cliwa5l.mongodb.net/shop?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function run() {
    try {
        await client.connect();

        db = client.db();
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

const getDb = () => {
    if (db) {
        return db;
    }

    return undefined;
}

const mongoConnect = (callback) => {
    run()
        .then(() => callback())
        .catch((err) => {
            console.dir();
            throw err;
        });
}

const collections = {
    PRODUCTS: "products",
    USERS: "users"
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
module.exports.collections = collections;
