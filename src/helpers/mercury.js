import request from 'request';

export function fetchPage(url, config) {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://mercury.postlight.com/parser',
      qs: { url },
      headers: {
        'x-api-key': config.key,
      },
      json: true,
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (body && body.error) {
        reject(body.messages || 'Could not fetch URL');
      } else if (!body || !body.content) {
        reject('Could not fetch URL: Malformed response from Mercury');
      } else {
        resolve(body.content);
      }
    });
  });
}
