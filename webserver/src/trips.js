'use strict'

const cache = require('./cache')

const Chance = require('chance')
const chance = new Chance()

module.exports.handle = (req, reply) => {
    const tripsObject = cache.getTrips()
    const trips = Object.keys(tripsObject).map(k => tripsObject[k])
    reply({trips})
}

module.exports.addTrip = (id, phone, timestamp) => {
    const price = chance.dollar({max: 30})
    cache.addTrip(id, phone, chance.coordinates(), chance.coordinates(), timestamp, price)
    return price
}