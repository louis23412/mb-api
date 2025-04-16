export async function httpLogoutUser(req, res) {
    if (req.session.token) {
        req.session = null

        return res.status(200).json({
            message : 'logout success'
        })
    }

    res.status(401).json({
        error : 'not logged in'
    })
}