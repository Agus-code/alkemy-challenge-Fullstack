const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        uUsername: {
            type: String,
            require: true
        },
        uEmail: {
            type: String,
            require: true
        },
        uPassword: {
            type: String,
            require: true
        },
        uBudgets: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;