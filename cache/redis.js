const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const config = require('../configs/constants');

const redisClient = redis.createClient(config.redis);
redisClient.hget = util.promisify(redisClient.hget);

redisClient.on('error', function(err) {});

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
  
    return this;
  };

