const adminAuth = (req, res, next) => {
    if (!req.session || !req.session.adminId) {
        req.flash("error", "Access denied: you need to be logged in to view this page");
        return res.redirect("/admin/login");
    }
    next();
}
module.exports = adminAuth;