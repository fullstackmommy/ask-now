const auth = {
    isAuthenticated() {
        if (typeof window == "undefined") 
            return false

        if (sessionStorage.getItem('jwt')) {
            console.log(JSON.stringify(sessionStorage.getItem('jwt')))
            return JSON.parse(sessionStorage.getItem('jwt'))
        } else {
            return false
        }
    },
    authenticate(jwt, cb) {
        if (typeof window !== "undefined") 
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        cb()
    },
    signout(cb) {
        console.log("sign out")
        if (typeof window !== "undefined") 
            sessionStorage.removeItem('jwt')
        cb()
    }
}

export default auth