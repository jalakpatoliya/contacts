const mongoose = require("mongoose");

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds123971.mlab.com:23971/contacts`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
    if (err) { console.log('connection error', err); } else {
        console.log('DB connected sucessfully');
    }
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
