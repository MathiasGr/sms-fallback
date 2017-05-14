'use strict'

const request = require('request')


module.exports = async (method, uri, headers, body) => {
    const options = {}

    options.method = method
    options.uri = uri
    options.headers = headers

    if (Object.keys(body).length > 0) {
        if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
            options.qs = body
        } else {
            options.body = body
            options.json = true
        }
    }

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error)
            } else {
                resolve(response)
            }
        })
    })
}