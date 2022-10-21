const CryptoWatcherControllers = require("../controller/mongoose.controllers");

module.exports = app => {
    app.get('/api/cryptowatcher',CryptoWatcherControllers.findAllCryptoWatchers);
    app.get('/api/crypto-by-user/:username', CryptoWatcherControllers.findByUser);
    app.get('/api/cryptowatcher/:id',CryptoWatcherControllers.findOneCryptoWatcher);
    app.post('/api/cryptowatcher',CryptoWatcherControllers.createCryptoWatcher);
    app.put('/api/cryptowatcher/:id',CryptoWatcherControllers.updateCryptoWatcher);
    app.delete('/api/cryptowatcher/:id',CryptoWatcherControllers.deleteCryptoWatcher);
};