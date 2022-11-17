import { HTTPResponseError } from '#internal/shared';
import fetch, { Headers, Response } from 'node-fetch';

const YAHOO_FANTASY_URL = 'https://fantasysports.yahooapis.com/fantasy/v2/';

export const get = async (path: string) => {
  const url = new URL(`users;use_login=1/${path}`, YAHOO_FANTASY_URL);
  
  const params = new URLSearchParams();
  params.append('format', 'json')

  const finalUrl = `${url.toString()}?${params.toString()}`;
  const headers = new Headers({ 
    Authorization: `${process.env.YAHOO_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  });
  
  const request = fetch(finalUrl, { headers });
  const response = await request;
  checkStatus(response);

  return await response.json();
};

const checkStatus = (response: Response) => {
	if (!response.ok)
    throw new HTTPResponseError(response);
  return response;
}