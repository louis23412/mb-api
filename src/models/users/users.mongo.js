import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    lastLogin : {
        type : Date,
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
    },

    currencies : {
        credits : {
            type : Number,
            default : 1000
        },

        blackMatter : {
            type : Number,
            default : 100
        }
    }
})

export default mongoose.model('User', usersSchema);