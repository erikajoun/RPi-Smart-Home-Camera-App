function createUrl(endpoint, ip, port) {
    let url = `http://${ip}:${port}/${endpoint}`
    if (endpoint === '/') {
        url = url.slice(0, -1)
    }
    return url
}

export { createUrl }
