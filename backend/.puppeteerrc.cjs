/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // This tells puppeteer where to cache Chrome on Render's server.
  // Set PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer in Render env vars.
  cacheDirectory: process.env.PUPPETEER_CACHE_DIR || require('path').join(require('os').homedir(), '.cache', 'puppeteer'),
};
