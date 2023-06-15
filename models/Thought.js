const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 264
        },
        author: {
            type: String
        },
        reactions: [reactionSchema]
    }
);

thoughtSchema.virtual('reactionCount').get(()=>{
    if(!this.reactions){
        return 0;
    }
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema);
module.exports = Thought;