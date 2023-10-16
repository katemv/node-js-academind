const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex((item) => {
        return item.productId.toString() === product._id.toString();
    });

    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        updatedCartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity + 1;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: 1
        });
    }

    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.removeFromCart = function (productId) {
    this.cart.items = this.cart.items.filter((item) => {
        return item.productId.toString() !== productId.toString();
    });

    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    this.save();
}

module.exports = mongoose.model("User", userSchema);