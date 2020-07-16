const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imageUrl: String,
    email: {
        type: String,
        default: null,
        validate: {
            validator: function (email) {
                if (email) {
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                } else {
                    return true
                }
            },
            message: 'Provided phone number is invalid.'
        }
    },
    landlineNumber: String,
    notes: String,
    views: [{
        date: Date,
        count: { type: Number, default: 1 }
    }],
    totalViews: {
        type: Number, default: 0
    }
},
    { timestamps: true }
);


const ContactModel = mongoose.model('Contact', ContactSchema);

module.exports = ContactModel;