module.exports = validate => {
    return (req, res, next) => {
        try {
            const { error } = validate(req.body);

            if (error) {
                throw new Error(error);
            }

            next();
        } catch (error) {
            res.status(422).json(error.message);
            throw new Error(error);
        }
    };
};
