'use strict'

const debug = require('debug')('redis-cache')

const redis = require('../clients/redis')

const EXPIRE_SECONDS = 5 * 60 // 5min
const ID_KEY = 'id'
const CLIENTPHONENB_KEY = 'cpn'
const TARGETPHONENB_KEY = 'tpm'
const TOTALMESSAGES_KEY = 'tm'

const methods = {}

methods.hasBatch = async (shortId) => {
    debug('hasBatch - shortId=%s', shortId)
    try {
        const exists = await redis.existsAsync(shortId)
        return exists === 1
    } catch (e) {
        throw `hasBatch batch failed with error ${JSON.stringify(e)}`
    }
}

methods.getBatch = async (shortId) => {
    debug('getBatch - shortId=%s', shortId)
    try {
        const batch = await redis.hgetallAsync(shortId)
        return batch
    } catch (e) {
        throw `get batch failed with error ${JSON.stringify(e)}`
    }
}

methods.addPayloadToBatch = async (shortId, index, payload) => {
    debug('addPayloadToBatch - shortId=%s index=%s payload=%s', shortId, index, payload)
    try {
        await redis.hsetAsync(shortId, index, payload)
        await redis.expireAsync(shortId, EXPIRE_SECONDS)
    } catch (e) {
        throw `addPayloadToBatch failed with error ${JSON.stringify(e)}`
    }
}

methods.setIdForBatch = async (shortId, id) => {
    debug('setIdForBatch - shortId=%s id=%s', shortId, id)
    try {
        await redis.hsetAsync(shortId, ID_KEY, id)
    } catch (e) {
        throw `setIdForBatch failed with error ${JSON.stringify(e)}`
    }
}

methods.setTotalMessagesForBatch = async (shortId, messages) => {
    debug('setTotalMessagesForBatch - shortId=%s messages=%s', shortId, messages)
    try {
        await redis.hsetAsync(shortId, TOTALMESSAGES_KEY, messages)
    } catch (e) {
        throw `setTotalMessagesForBatch failed with error ${JSON.stringify(e)}`
    }
}

methods.setClientPhoneNumberForBatch = async (shortId, phoneNumber) => {
    debug('setClientPhoneNumberForBatch - shortId=%s phone=%s', shortId, phoneNumber)
    try {
        await redis.hsetAsync(shortId, CLIENTPHONENB_KEY, phoneNumber)
    } catch (e) {
        throw `setPhoneNumberForBatch failed with error ${JSON.stringify(e)}`
    }
}

methods.setTargetPhoneNumberForBatch = async (shortId, phoneNumber) => {
    debug('setTargetPhoneNumberForBatch - shortId=%s phoneNumber=%s', shortId, phoneNumber)
    try {
        await redis.hsetAsync(shortId, TARGETPHONENB_KEY, phoneNumber)
    } catch (e) {
        throw `setPhoneNumberForBatch failed with error ${JSON.stringify(e)}`
    }
}

module.exports = methods
