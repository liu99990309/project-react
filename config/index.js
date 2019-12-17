const sit = require('./sit.json')
const uat = require('./uat.json')
const prod = require('./prod.json')
const mock = require('./mock.json')

const config = {
    sit,
    uat,
    prod,
    mock
}

module.exports = env => {
    return config[env]
}
