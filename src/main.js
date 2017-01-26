import htmlToText from 'html-to-text';
import { fatal } from './helpers/ui';
import { fetchPage } from './helpers/mercury';

export default async function main(url, config) {
  // Grab the page content
  let pageContent;
  try {
    pageContent = await fetchPage(url, config);
  } catch (err) {
    if (err instanceof Error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }

      fatal('Could not fetch URL: ' + err.message);
    } else {
      fatal(err);
    }
  }

  // Convert the HTML into text
  let text;
  try {
    text = htmlToText.fromString(pageContent, {
      wordwrap: config.wordWrap,
      ignoreImage: config.ignoreImages,
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    fatal('Could not parse content');
  }

  // Reading, here we come
  console.log(text);
}
