const db = require("./db/models");
const { User } = require("./db/models")

const logInUser = async (req, res, user) => {
    req.session.auth = {
        userId: user.id
    }
}

const restoreUser = async (req, res, next) => {
    console.log(req.session);

    if(req.session.auth) {
        const {userId} = req.session.auth;

        try {
            const user = await User.findByPk(userId);

            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
}

const logoutUser = async (req, res) => {
 await delete req.session.auth;
};


module.exports = { logInUser, logoutUser, restoreUser }
