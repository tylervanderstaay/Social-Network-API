const { Schema } = require('mongoose');

const reactionSchema = new Schema((
    {
        body: {
            type: String,
            required: true,
            maxLength: 264
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            get: function(value) {
                return new Date(value).toLocaleDateString();
            }
        }
    }
));


module.exports = reactionSchema;