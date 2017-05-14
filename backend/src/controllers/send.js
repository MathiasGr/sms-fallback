'use strict'

const nexmo = require('../clients/nexmo')
const asyncbox = require('asyncbox')

const methods = {}

methods.sendChunks = async (chunks, clientNumber, serverNumber) => {
    console.log(`sending ${chunks} to ${clientNumber} from ${serverNumber}`)

    for (let c of chunks) {
        await nexmo(serverNumber, clientNumber, c)
        await asyncbox.sleep(1001)
    }
    return
}

module.exports = methods
