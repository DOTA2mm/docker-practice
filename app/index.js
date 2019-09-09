const http = require('http')
const redis = require('ioredis')
const mysql = require('mysql2/promise')
const { parse: parseURL } = require('url')

const redisClient = redis.createClient()
redisClient.on('error', err => {
    console.log(err)
})
const redisNS = 'test:docker:'

const connection = mysql.createConnection({
    host: 'db',
    database: 'forum'
})

const server = http.createServer(async (req, res) => {
    const url = parseURL(req.url)
    const resObj = {
        error: '',
        count: -1,
        userInfo: {}
    }
    try {
        if (url.path === '/') {
            const incrRes = await redisClient.multi().incr(`${redisNS}count`).exec()
            if (!incrRes[0][0]) {
                resObj.count = incrRes[0][1]
            }
            const [rows, fields] = await connection.execute('SELECT name, nickname, avatar, email FROM users WHERE id = ?', [1])
            console.log(rows, fields)
            if (rows.length) {
                resObj.userInfo = rows[0]
            }
        }
    } catch (err) {
        console.log(err)
        resObj.error = err.message || 'unknow error'
    } finally {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(resObj))
    }
})

server.listen(5200)
