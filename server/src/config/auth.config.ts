const authConfig = {
  secret: process.env.AUTH_SECRET as string,
  secret_expires_in: process.env.ACCESS_TOKEN_EXPIRATION as string,
  refresh_secret: process.env.AUTH_REFRESH_TOKEN_SECRET as string,
  refresh_expires_in: process.env.REFRESH_TOKEN_EXPIRATION as string,
};

export default authConfig;
