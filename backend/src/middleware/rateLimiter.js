import ratelimit from "../config/upstash.js"



const rateLimiter = async (req, res, next) => {
    // the 'limit-key' is the user-id, which will allow/limit the user for logins or other Api calls according to the limit set by the backend
    try {
        const {success} = await ratelimit.limit("my-limit-key")

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later."
            })
        }

        next()

    } catch (error) {
        console.log("Rate linit error", error)
        next(error)
    }
}

export default rateLimiter