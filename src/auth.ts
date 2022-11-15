import { AuthorizationCode, ModuleOptions, Token } from 'simple-oauth2';

let client: AuthorizationCode;

export const createAuth = () => {
  const config: ModuleOptions = {
    client: {
      id: process.env.CLIENT_ID as string,
      secret: process.env.CLIENT_SECRET as string,
    },
    auth: {
      tokenHost: 'https://api.login.yahoo.com',
      tokenPath: '/oauth2/get_token',
      authorizePath: '/oauth2/request_auth'
    },
  };
  
  client = new AuthorizationCode(config);
};

export const requestAuth = (redirectUri: string) => {
  const url = client.authorizeURL({
    redirect_uri: redirectUri
  });

  return url;
};

export const getToken = async (code: string, redirectUri: string) => {
  try {
    return await client.getToken({ code, redirect_uri: redirectUri });
  } catch (error) {
    console.error(error);
  }
};

export const refreshToken = async (token: Token) => {
  try {
    return await client.createToken(token).refresh();
  } catch (error) {
    console.error(error);
  }
};
