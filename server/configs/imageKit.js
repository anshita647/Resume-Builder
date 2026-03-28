import ImageKit from "@imagekit/nodejs";
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,   // required
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // required
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT // required
});

export default imagekit;