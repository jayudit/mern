const mongoose = require('mongoose') //odm to react with mongodb

//create a user schema : fields we want user to have
const userSchema = mongoose.Schema({ // pass object
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email : {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
},
{
    timestamps: true 
}
)

module.exports = mongoose.model('User', userSchema) //export the userSchema just created as a mongoose model