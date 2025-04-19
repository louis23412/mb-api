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

        darkMatter : {
            type : Number,
            default : 100
        }
    },

    exp : {
        type : Number,
        default : 0
    },

    defaultPlanet : {
        type : String,
        default : ''
    },

    totalPlanets : {
        type : Number,
        default : 0
    },

    planetList : {
        type : [ Object ],
        default : []
    }
})

export default mongoose.model('User', usersSchema);