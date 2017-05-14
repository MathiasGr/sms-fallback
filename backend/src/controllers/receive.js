'use strict'

const HEADER_SEPARATOR = '.'
const SHORTID_LENGTH = 4

const methods = {}

methods.isHeaderMessage = (message) => {
    return message.indexOf(HEADER_SEPARATOR) > 7
}

methods.parseMessage = (message) => {
    const shortId = message.substring(0, 4)
    const index = parseInt(message.substring(4, message.indexOf(HEADER_SEPARATOR)), 10)
    const payload = message.substring(message.indexOf(HEADER_SEPARATOR) + 1)
    return {shortId, index, payload}
}

methods.parseHeader = (message) => {
    const id = message.split(HEADER_SEPARATOR)[0]
    const shortId = id.substring(id.length - SHORTID_LENGTH)
    const index = 0
    const messages = parseInt(message.split(HEADER_SEPARATOR)[1], 10)
    const payload = message.split(HEADER_SEPARATOR).splice(2).join(HEADER_SEPARATOR)
    return {id, shortId, index, messages, payload}
}

module.exports = methods
