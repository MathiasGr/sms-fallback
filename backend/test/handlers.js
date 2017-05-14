'use strict'

require('dotenv').load()

const expect = require('chai').expect
const Chance = require('chance')
const chance = new Chance()

const receive = require('../src/handlers/receive')

describe('main handler', () => {

    describe('with one message', () => {
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

        // it('works', async () => {
        //     const a = await receive.receive(payload)
        //     console.log(a)
        // })
    })

    describe('with two messages', () => {
        const uid = chance.guid({version: 4})
        const payload1 = {
            "msisdn": "16193130354",
            "to": "12035338331",
            "messageId": "02000000E68951D8",
            "text": `${uid}.2.{"a":12, "b":"c"`,
            "type": "text",
            "keyword": "HELLO7",
            "message-timestamp": "2016-07-05 21:46:15"
        }
        const payload2 = {
            "msisdn": "16193130354",
            "to": "12035338331",
            "messageId": "02000000E68951D8",
            "text": `${uid.substring(uid.length - 4)}1.,"t":"s"}`,
            "type": "text",
            "keyword": "HELLO7",
            "message-timestamp": "2016-07-05 21:46:15"
        }

        // it('works', async () => {
        //     await receive.receive(payload1)
        //     const b = await receive.receive(payload2)
        //     console.log(b)
        // })
    })
})