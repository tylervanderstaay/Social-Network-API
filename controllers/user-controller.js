const { User, Thought } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            console.error(err)
            return res.status(500).json(err);
        };
    },
    
    async getSingleUser(req, res) {
        try {
            console.log(req.params)
            const user = await User.findOne({ _id: req.params.id })
                .select('-__v')
                .populate('thoughts')
                .populate('friends')

            if (!user) {
                return res.status(404).json({ message: 'No matching user' });
            };

            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json({ user, message: 'Created user' });
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    async updateUserEmail(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { email: req.body.email } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No matching user' })
            };

            res.status(200).json({ user, message: 'Updated user email' });
        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },

    async delUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });

            if (!user) {
                res.status(404).json({ message: 'No matching user' });
            };

            const thought = await Thought.deleteMany({ username: user.username });
            if (!thought) {
                res.status(404).json({ message: 'User deleted' })
            }

            res.status(200).json({ message: 'User completely deleted' });
        } catch (err) {
            console.error(err)
            return res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.body.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No matching user' })
            };

            res.status(200).json({ user, message: 'Friend added' });
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        };
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friend: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No matching user' });
            };
            res.status(200).json({ user, message: 'Friend deleted' });
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }
};