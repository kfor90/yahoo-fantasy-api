import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import { createAuth, getToken, refreshToken, requestAuth } from './auth.js';
import * as game from './resources/game.js';
import { HTTPResponseError } from './shared/errors.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello<br><a href="/auth">Log in with Yahoo</a>');
});

app.get('/api', async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    process.env.YAHOO_ACCESS_TOKEN=authorization;
    res.json(await game.collection());
  } catch(error) {
    if (error instanceof HTTPResponseError)
      res.json(await error.reason());
    else
      res.status(400).send('Bad Request');
  }
});

app.put('/refresh_auth', async (req: Request, res: Response) => {
  try {
    const token = req.body;
    res.json(await refreshToken(token));
  } catch(error) {
    res.status(400).send(error);
  }
});

app.get('/auth', async (req: Request, res: Response) => {
  res.redirect(requestAuth(`https://b526-176-100-43-83.ngrok.io/callback`));
});

app.get('/callback', async (req: Request, res: Response) => {
  const { code } = req.query;
  const accessToken = await getToken(code as string, `https://b526-176-100-43-83.ngrok.io/callback`);
  res.status(200).json(accessToken?.token);
});

app.listen(port, () => {
  createAuth();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
