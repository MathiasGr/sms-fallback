'use strict'

const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 100, checkperiod: 10 })

const methods = {}

methods.addTrip = (id, phone, start, end, timestamp) => {
    cache.set(id, {phone, start, end, timestamp})
}

methods.getTrips = () => {
    const mykeys = cache.keys()
    const trips = cache.mget(mykeys)
    return trips
}

module.exports = methods