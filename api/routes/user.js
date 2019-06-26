const bcrypt = require('bcryptjs');
const router = require('express').Router();
const validate = require('../../middleware/validate');
const User = require('../../models/users');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await User.getById(id);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'User with this ID does not exist' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/:id', validate(User.putSchema), async (req, res) => {
    const { id } = req.params;
    const toUpdate = req.body;

    try {
        // returns the user object
        const [user] = await User.getById(id);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'User with this ID does not exist' });
        }

        if (toUpdate.password) {
            toUpdate.password = bcrypt.hashSync(toUpdate.password, 10);
        }
        // returns number of edited records in DB
        await User.update(id, toUpdate);

        const [updatedUser] = await User.getById(id);

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
