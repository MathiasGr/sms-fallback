'use strict'

// requires for testing
const Code        = require('code')
const expect      = Code.expect
const Lab         = require('lab')
const lab         = exports.lab = Lab.script()
const Async       = require('async')
const Chance = require('chance')
const chance = new Chance()

// use some BDD verbage instead of lab default
const describe    = lab.describe
const it          = lab.it
const after       = lab.after
const before      = lab.before

// require hapi server
const Server = require('../src/index')

// tests
describe('functional tests', () => {
    it('should word', (done) => {
        const uid = chance.guid({version: 4})
        const payload = {
            "msisdn": "16193130354",
            "to": "16193130354",
            "messageId": "02000000E68951D8",
            "text": `${uid}.1.{"a":12}`,
            "type": "text",
            "keyword": "HELLO7",
            "message-timestamp": "2016-07-05 21:46:15"
        }
        Server.inject({
            method: 'POST',
            url: '/hook',
            payload: payload
        }, (response) => {
            done()
        })
    })
})