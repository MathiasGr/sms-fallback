'use strict'

const SMS_MAX_LENGTH = 160
const HEADER_STRING_LENGTH = 119
const SHORTID_LENGTH = 4

const methods = {}

methods.formatResponse = (response) => {
    let body
    try {
        body = JSON.parse(response.body)
    } catch (e) {
        body = response.body
    }
    return new Buffer(JSON.stringify({
        code: response.statusCode,
        message: response.statusMessage,
        body
    }, null, Symbol(''))).toString('base64')
}

methods.makeChunks = (response, id) => {
    // make a string from the json
    let string = methods.formatResponse(response)
    console.log(string.length)

    let headerString = string.substring(0, HEADER_STRING_LENGTH)

    let messages = []
    let index = 1

    if (string.length > HEADER_STRING_LENGTH) {
        const shortId = id.substring(id.length - SHORTID_LENGTH)
        string = string.substring(HEADER_STRING_LENGTH, string.length)
        while (string.length !== 0) {
            const messageHeader = `${shortId}${index}.`
            const messageString = string.substring(0, SMS_MAX_LENGTH - messageHeader.length)
            messages.push(`${messageHeader}${messageString}`)
            string = string.substring(SMS_MAX_LENGTH - messageHeader.length)
            index += 1
        }
    }

    // put the header message on top
    messages.unshift(`${id}.${index}.${headerString}`)
    
    return messages
}

methods.sendMessages = (chunk) => {

}

module.exports = methods