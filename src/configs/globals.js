const env = {
    SERVER_URL: process.env.REACT_APP_SERVER_URL || 'http://localhost:8080',
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
    COOKIE_KEY: process.env.REACT_APP_COOKIE_KEY || 'qr-local'

}

export default {env}