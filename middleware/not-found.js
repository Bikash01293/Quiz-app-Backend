const pageNotFound = ( req, res, next ) => {
    const error = new Error( 'Page NOt Found ! ')
    error.status = 404
    next(error)
    
}

const apiNotFound = ( req, res, next ) => {
    const error = new Error( 'API endpoints not supported ')
    error.status = 404
    next(error)
}

module.exports = {
    pageNotFound,
    apiNotFound
}