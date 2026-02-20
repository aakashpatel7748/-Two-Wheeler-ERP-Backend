// SDK initialization
import ImageKit from "imagekit";

export const imagekit = function () {
    const imagekit = new ImageKit({
        publicKey: "public_xMaw0Pl76Qgv2X93u558R7jY+Y4=",
        privateKey: "private_NGeyvOWKyUQT4A0+uDMv+741HMI=",
        urlEndpoint: "https://ik.imagekit.io/go4bsbcbc/"
    });
    return imagekit
}
