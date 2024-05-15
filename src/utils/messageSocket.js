const messageSocket = (socketServer) => {
    return (req, res, next) => {
        req.socketServer = socketServer
        return next()
    }
}

module.exports = messageSocket