'use strict'

const config = require('../config').nexmo
'use strict'

const request = require('request')


module.exports = async (from, to, message) => {

    const body = JSON.stringify({
        api_key: config.apiKey,
        api_secret: config.apiSecret,
        'to': to,
        'from': from,
        text: message
    })

    console.log(body)

    const options = {}

    options.method = 'POST'
    options.uri = 'https://rest.nexmo.com/sms/json'
    options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
    }
    options.body = body

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            console.log(response.body)
            if (error) {
                reject(error)
            } else {
                resolve(response)
            }
        })
    })
}