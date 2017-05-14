'use strict'

const _ = require('lodash')

const client = require('../clients/request')

const config = require('../config.json')

const methods = {}

methods.buildBodyObject = (payload) => {
    return {
        phone: payload.clientNumber,
        id: payload.id,
        request_timestamp: payload.timestamp,
        object: payload.object
    }
}

methods.process = async (payload) => {

    if (!_.has(config.numbers, payload.targetNumber)) {
        return {
            success: false,
            error: `Server doesn't have any configuration for number ${payload.targetNumber}`
        }
    }

    const body = methods.buildBodyObject(payload)
    const requestInfo = config.numbers[payload.targetNumber]

    try {
        const response = await client(requestInfo.method, requestInfo.uri, requestInfo.headers, body)
        return response
    } catch (e) {
        return {
            success: false,
            error: `Request failed for ${JSON.stringify(requestInfo)}`
        }
    }
}

module.exports = methods
