module.exports = validate => {
    return (req, res, next) => {
        const { error } = validate(req.body);

        if (error) {
            res.status(422).json(error.message);
            throw new Error(error);
        }

        next();
    };
};
