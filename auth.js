const logInUser = async (req, res, user) => {
     req.session.auth = {
        userId: user.id
    }
    res.locals.user = req.session.auth
}

const logoutUser = async (req, res) => {
 await delete req.session.auth;
};


module.exports = { logInUser, logoutUser }
