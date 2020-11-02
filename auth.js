const logInUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id
    }
}

const logoutUser = (req, res) => {
  delete req.session.auth;
};


module.exports = { logInUser, logoutUser }
