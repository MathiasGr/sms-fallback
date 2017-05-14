'use strict'

const Hapi = require('hapi')
const Joi = require('joi')

const server = new Hapi.Server()
server.connection({ port: 3666, host: 'localhost' })
const trips= require('./trips')

server.route({
    method: 'POST',
    path: '/trip',
    handler: (req, reply) => {
        const payload = req.payload
        const price = trips.addTrip(payload.id, payload.phone, payload.request_timestamp)
        reply({success: true, price})
    },
    config: {
        validate: {
            payload: {
                phone: Joi.string(),
                id: Joi.string(),
                request_timestamp: Joi.string(),
                object: Joi.object()
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/trips',
    handler: trips.handle,
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
});

server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server running at: ${server.info.uri}`)
})