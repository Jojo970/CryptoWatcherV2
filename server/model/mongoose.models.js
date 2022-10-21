const mongoose = require('mongoose');

const CryptoWatcherSchema = new mongoose.Schema(
    {
        cryptoName: {
            type:String,
            required:[
                true,
                'Coin name is required!'
            ]
        },
        cryptoQuantity: {
            type: Number,
            default: 0,
        },
        cryptoPrice: {
            type: Number,
            default: 0
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    }
);

const CryptoWatcher = mongoose.model('CryptoWatchers', CryptoWatcherSchema);

module.exports = CryptoWatcher;