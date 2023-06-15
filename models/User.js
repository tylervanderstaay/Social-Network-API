const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                "Please enter a valid email address"
            ]
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(() => {
    if(!this.friends){
    return 0;
    }
    return this.friends.length
});

const User = model('user', UserSchema);

module.exports = User;