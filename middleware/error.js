const errorHandler = ( error, req, res, next ) => {
    res.status( error.status || 500 )
    res.json({
        error: error.status,
        message: error.message
    })

    // Alternate way to write above lines for sending both status and json response in a single line

    // res.status( error.status || 500 ).json({
    //     error: error.status,
    //     message: error.message
    // })
}

module.exports = errorHandler