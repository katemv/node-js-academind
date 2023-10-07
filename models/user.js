const mongodb = require("mongodb");
const { getDb, collections} = require("../util/database");

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save () {
        const db = getDb();

        return db.collection(collections.USERS).insertOne(this);
    }

    static findById (userId) {
        const db = getDb();
        return db.collection(collections.USERS)
            .find({ _id: new mongodb.ObjectId(userId) })
            .next()
            .then((user) => user)
            .catch((err) => console.log(err));
    }
}

module.exports = User;