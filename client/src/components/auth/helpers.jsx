import cookie from 'js-cookie';

// Set in cookie

export const setCookie = (key, value) => {
    if (window !== 'undefined')
        cookie.set(key, value, {
            expires: 1
        });
}

//Remove from cookie

export const removeCookie = (key) => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

// Get from cookie such as stored token. 
// Will be useful when we need to make request to server with token
export const getCookie = (key, value) => {
    if (window !== 'undefined')
        return cookie.get(key);
}

// set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// Remove from localstorage
export const removetLocalStorage = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

// Authenticate user by passing data to cookie and localatorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

// Access user info from localstorage 
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = setCookie('token');
        if (cookieChecked)
            if (localStorage.getItem('user'))
                return JSON.parse(localStorage.getItem('user'));
            else
                return false
    }
}
