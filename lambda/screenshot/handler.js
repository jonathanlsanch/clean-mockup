'use strict';

const sharp = require('sharp');
const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const devices = require('puppeteer-core/DeviceDescriptors');

const quantcastCleaner = require('./utils/cleaners/quantcast');
const bannerCleaner = require('./utils/cleaners/banner');

module.exports.screenshot = async (event, context, callback) => {
  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    let page = await browser.newPage();

    let url = 'https://www.premieroctet.com/';
    let viewport = 'iPhone SE';

    if (event.queryStringParameters && event.queryStringParameters.url) {
      url = decodeURIComponent(event.queryStringParameters.url);
      url = url.toLowerCase();

      if (!url.startsWith('http')) {
        url = 'http://' + url;
      }
    }

    if (event.queryStringParameters && event.queryStringParameters.viewport) {
      viewport = event.queryStringParameters.viewport;
    }

    await page.emulate(devices[viewport]);
    await page.goto(url, { waitUntil: 'networkidle2' });

    const cleaners = [bannerCleaner, quantcastCleaner];

    let elementRemoved = false;
    cleaners.forEach(async cleaner => {
      if (!elementRemoved) {
        elementRemoved = await page.evaluate(cleaner);
      }
    });

    await page._client.send('Animation.setPlaybackRate', { playbackRate: 20 });
    await page.waitFor(500);

    const screenshot = await page.screenshot();
    await browser.close();

  //   if (viewport !== 'iPad Pro landscape') {
  //     let image = await sharp(__dirname + '/assets/browser.png')
  //     .composite([{ input: screenshot, top: 138, left: 112 }]);
  //   }

  // const buffer = await image.toBuffer();
  let image = await sharp(screenshot)
  // .overlayWith(screenshot, { top: 138, left: 112 });
    // .composite([{  }]);
  // if (color !== 'transparent') {
  //   image = await image.flatten({ background: { r, g, b, alpha: 1 } });
  // }

  const buffer = await image.toBuffer();

  callback(null, {
    statusCode: 200,
    isBase64Encoded: true,
    body: buffer.toString('base64'),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=60',
    },
  });
} catch (error) {
  callback(error);
}
};