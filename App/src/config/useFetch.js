const fetch = require('node-fetch')
const request = require('request')

module.exports = {
    getEvents: async function(){
		
    const response = await fetch('http://localhost:3000/api/evento', {
        method:'GET'
    })
    const data = await response.text()
    return JSON.parse(data)
    }
}