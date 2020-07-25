module.exports = {
    ensureAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        else {
            res.redirect('/auth/google')
        }
    },
    ensureGuest: function(req, res, next) {
        if (req.isAuthenticated) {
            res.json({ user: req.user })
        }
        else {
            return next()
        }
    }
}