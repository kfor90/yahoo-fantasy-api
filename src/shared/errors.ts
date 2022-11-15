import { Response } from 'node-fetch';

export class HTTPResponseError extends Error {
  readonly response: Response;

	constructor(response: Response) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
		this.response = response;
	}

  async reason() {
    try {
      return JSON.parse(await this.response.text());
    } catch (error) {
      return;
    }
  }
}