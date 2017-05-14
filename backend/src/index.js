'use strict'

const Hapi = require('hapi')
const Joi = require('joi')

require('dotenv').load()

const receiveHandler = require('./handlers/receive')

const server = new Hapi.Server()
server.connection({ port: 3000, host: 'localhost' })

server.route({
    method: 'GET',
    path: '/hook',
    handler: receiveHandler.receive
});

server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server running at: ${server.info.uri}`)
})