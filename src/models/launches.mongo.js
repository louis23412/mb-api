import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },

    username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    hash : {
        type : String,
        required : true
    }
})

export default mongoose.model('User', usersSchema);