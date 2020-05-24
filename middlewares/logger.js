const myLogger = (req, res, next) => {
    console.log('Logged');
    next();
}

module.exports = myLogger;