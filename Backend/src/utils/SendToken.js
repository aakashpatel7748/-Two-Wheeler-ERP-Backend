export const sendToken = (superAdmin, statusCode, res) => {
    const token = superAdmin.getJwtToken();
    // Options for cookie
   
    const cookieExpire = Number(process.env.COOKIE_EXPIRE) || 1;

    const options = {
        expires: new Date(Date.now() +cookieExpire * 60 * 60 * 1000),
        httpOnly: true,
    };
    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, token , superAdmin})
}