'use strict'

const _ = require('lodash')

const TOTALMESSAGES_KEY = 'tm'
const ID_KEY = 'id'
const CLIENTPHONENB_KEY = 'cpn'
const TARGETPHONENB_KEY = 'tpm'

const methods = {}

methods.checkIntegrity = (data) => {
    if (!_.has(data, TOTALMESSAGES_KEY)) {
        return false
    }
    const integrity = Array.from(Array(parseInt(data[TOTALMESSAGES_KEY], 10)).keys()).reduce((prev, cur) => {
        return prev && _.has(data, cur)
    }, true)
    return integrity
}

methods.do = (data) => {
    let entireString = ""
    for (let i=0; i<data[TOTALMESSAGES_KEY]; i++) {
        entireString += data[i]
    }
    try {
        let object = JSON.parse(entireString)
        return {
            success: true,
            object,
            clientNumber: data[CLIENTPHONENB_KEY],
            targetNumber: data[TARGETPHONENB_KEY],
            id: data[ID_KEY]
        }
    } catch (e) {
        return {success: false, error: e}
    }
}

module.exports = methods
