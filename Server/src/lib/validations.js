exports.validateEmail = function(email){
    const chars = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(chars.test(email.toLowerCase())) return false;
    return true
}

exports.validateUsername = function(username){
    const chars = /^[0-9a-zA-Z]+$/;
    if(chars.test(username)) return false
    return true
}