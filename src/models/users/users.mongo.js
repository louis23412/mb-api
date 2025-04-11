import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
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
    },

    totalPlanets : {
        type : Number,
        default : 1
    },

    defaultPlanet : {
        type : String,
        required : true
    },

    planets : [ Object ]
})

export default mongoose.model('User', usersSchema);