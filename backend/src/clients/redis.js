'use strict'

const redis = require('redis')
const bluebird = require('bluebird')
const Config = require('../config')
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/**
 * ## The connect string for the dev environment
 *
 */
const connection_string = Config.redis

const redisClient = redis.createClient(connection_string)

module.exports = redisClient