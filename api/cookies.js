import Cookies from 'js-cookie'

// TODO: secure cookies + iron session of next

const securityObject = {
    secure: true,
    expires: 2
}
const api = Cookies.withAttributes(securityObject)

export const cookie = {
    get accessToken() {
        return api.get("accessToken");
    },
    set accessToken(token) {
        api.set("accessToken", token);
    },
    
    clearAllCookies() {
        const cookies = Object.keys(Cookies?.get() || {}); // Get all cookie names
        cookies.forEach(function(cookie) {
            Cookies?.remove(cookie); // Remove each cookidynamice 
        });
    }
};