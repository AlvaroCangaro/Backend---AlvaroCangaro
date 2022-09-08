const { logger } = require('../logger');

const logRequests = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};
const logInexistentRoutes = (req, res, next) => {
    logger.warn(`${req.method} ${req.url}`);
    res.send('Ruta inexistente');
};

module.exports = { logRequests, logInexistentRoutes };