export const sendToken = async (user, statusCode, res) => {
    const token = await user.getJwtToken();
    // Options for cookie

    const cookieExpire = Number(process.env.COOKIE_EXPIRE) || 1;

    const options = {
        expires: new Date(Date.now() + cookieExpire),
        httpOnly: true,
    };
    const responseData = { success: true, token };

    // Use 'company' key for Company model, 'user' for others to keep frontend happy
    if (user.role === 'company' || user.constructor.modelName === 'company') {
        responseData.company = user;
    } else {
        responseData.user = user;
    }

    res
        .status(statusCode)
        .cookie("token", token, options)
        .json(responseData)
}

