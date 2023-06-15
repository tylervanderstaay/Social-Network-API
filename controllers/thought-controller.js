const { Thought, User } = require('../models');

const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
};

const getSingleThought = async (req, res) => {
    try {
        console.log(req.params)
        const thought = await Thought.findOne({
            _id: req.params.thoughtId
        });

        if (!thought) {
            return res.status(404).json({ message: 'No matching thought' })
        };
    } catch (err) {
        console.error(err)
        return res.status(500).json(err);
    }
};

const addThought = async (req, res) => {
    try {
        console.log(req.body)
        const thought = await Thought.create(req.body);

        const user = await User.findOneAndUpdate(
            { _id: req.body.author },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }
        res.status(200).json({ thought, message: 'Thought created' });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};

const editThought = async (req, res) => {
    try {
        
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { content: req.body.content } },
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No matching thought' });
        };

        res.status(200).json({ thought, message: 'Thought updated' });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const delThought = async (req, res) => {
    try {
        const thought = await THought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No matching thought' });
        };

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } }
        );

        res.status(200).json({ message: 'Thought deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err)
    }
}

const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No matching thought' });
        };

        res.status(200).json({ message: 'Reaction deleted' });
    } catch (err) {
        console.error(err)
        return res.status(500).json(err);
    }
}

const delReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No matching thought' });
        };
        res.status(200).json({ message: 'Reaction deleted' });
    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
};

module.exports = { getThoughts, getSingleThought, addThought, editThought, delThought, addReaction, delReaction }