const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },                                  
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;