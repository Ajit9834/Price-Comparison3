/**
 * Puppeteer configuration for Render deployment.
 * Sets the cache directory to a writable location on Render's filesystem.
 */
const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Use Render's writable cache path, fallback to local cache for development
  cacheDirectory: process.env.PUPPETEER_CACHE_DIR || join(__dirname, '.cache', 'puppeteer'),
};
