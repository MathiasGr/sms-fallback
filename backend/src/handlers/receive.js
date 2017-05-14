'use strict'

const asyncbox = require('asyncbox')
const _ = require('lodash')
const debug = require('debug')('receive-handler')

const assemble = require('../controllers/assemble')
const receive = require('../controllers/receive')
const cache = require('../controllers/cache')
const request = require('../controllers/request')
const responseController = require('../controllers/response')
const sendController = require('../controllers/send')

const handlers = {}

handlers.receive = async (req, reply) => {
    debug('receive - req=%j', req)
    const event = req.query
    debug('receive - event %j', event)

    reply().code(200)

    const message = event.text

    let parsedEvent
    if (receive.isHeaderMessage(message)) {
        debug('receive - isHeader=true')
        parsedEvent = receive.parseHeader(message)
    } else {
        debug('receive - isHeader=false')
        parsedEvent = receive.parseMessage(message)
    }

    let promises = []

    if (!(await cache.hasBatch(parsedEvent.shortId))) {
        debug('receive - batch initialization')
        promises.push(cache.setClientPhoneNumberForBatch(parsedEvent.shortId, event.msisdn))
        promises.push(cache.setTargetPhoneNumberForBatch(parsedEvent.shortId, event.to))
    }

    if (_.has(parsedEvent, 'id')) {
        promises.push(cache.setIdForBatch(parsedEvent.shortId, parsedEvent.id))
        promises.push(cache.setTotalMessagesForBatch(parsedEvent.shortId, parsedEvent.messages))
    }

    promises.push(cache.addPayloadToBatch(parsedEvent.shortId, parsedEvent.index, parsedEvent.payload))

    await asyncbox.parallel(promises)

    const data = await cache.getBatch(parsedEvent.shortId)
    debug('receive - got BatchData %j', data)

    if (!assemble.checkIntegrity(data)) {
        debug('receive - integrity=false')
        return // "Do something with the error"
    }
    debug('receive - integrity=true')
    const payload = assemble.do(data)
    payload.timestamp = event['message-timestamp']
    debug('receive - assembled %j', payload)
    if (!payload.success) {
        debug('receive - assemble not successful')
        return // "Do something with the error"
    }

    // Do the request
    const response = await request.process(payload)
    debug('receive - response: %j', response)
    
    // Make the response messages
    const chunks = responseController.makeChunks(response, data.id)

    await sendController.sendChunks(chunks, payload.clientNumber, payload.targetNumber)

    return chunks
}

module.exports = handlers
