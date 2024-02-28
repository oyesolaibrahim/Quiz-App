const userAuth = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        req.flash("error", "Access denied: you need to be logged in to view this page");
        return res.redirect("/user/login");
    }
    next();
}
module.exports = userAuth;