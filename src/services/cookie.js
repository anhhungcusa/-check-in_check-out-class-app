import decode from 'jwt-decode'

const setCookie = (key, jwtToken, exp) => {
    const decoded = decode(jwtToken)
    let expires = exp || new Date(decoded.exp * 1000)
    expires = expires.toUTCString()
    document.cookie = `${key}=${jwtToken}; expires=${expires}`
}

const getCookie = key => {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
}

const removeCookie = key => {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default {getCookie, setCookie, removeCookie}