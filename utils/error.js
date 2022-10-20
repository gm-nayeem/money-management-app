module.exports = {
    serverError(res, err) {
        console.log(err)
        res.status(500).json({
            message: 'Server Error Occurred'
        })
    },

    resourceError(res, message) {
        res.status(400).json({
            message
        })
    }
}