let mongoose = require('mongoose');
// connect to mongo-db
let uri = 'mongodb://localhost/mongoose_test';
let options = {
    useMongoClient : true,
    server:
        {
            socketOptions: {
                keepAlive: 300000,
                connectTimeoutMS: 10000
            }
        }
    } ;
mongoose.connect(uri, options);
