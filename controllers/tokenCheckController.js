exports.index = (req, res) => {
    res.send({
        message: "Valid Token",
        currentUser: req.user.username
    })
}