const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const { isURL } = require('validator');
const Url = require('../modal/urlsSchema');
require('dotenv').config();

const url = process.env.URL;
const shortUrlRouter = express.Router();

mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected successfully');
});

function createShortUrl() {
  // const created = true;
  let shortUrl = '';
  for (let i = 0; i < 7; i += 1) {
    if (Math.random() < 0.5) {
      shortUrl += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    } else {
      shortUrl += String.fromCharCode(48 + Math.floor(Math.random() * 10));
    }
  }
  return shortUrl;
}

function createObj(originUrl) {
  const urlObj = {
    originUrl,
    shortUrl: createShortUrl(),
    views: 0,
    creatorDate: moment().toDate(),
  };
  return urlObj;
}

shortUrlRouter.post('/', async (req, res, next) => {
  try {
    console.log('i am here');
    const { originUrl } = req.body;
    if (originUrl.length > 200) {
      throw new Error('url is too long');
    }
    if (isURL(originUrl)) {
      const obj = createObj(originUrl);
      console.log(obj);
      await Url.insertMany(obj);
      return res.send(obj.shortUrl);
    }
    throw new Error('INVALID URL');
  } catch (err) {
    if (err.message === 'INVALID URL' || err.message === 'url is too long') {
      return next({ status: 400, message: { error: err.message } });
    }
    if (err.message.includes('originUrl')) {
      const originUrl = err.errors.originUrl.value;
      const { shortUrl } = await Url.findOne({ originUrl });
      return res.send(shortUrl);
    }
    // if (err.message.includes('shortUrl')) {
    // }
    return next({ message: { error: err } });
  }
});

shortUrlRouter.get('/');

module.exports = shortUrlRouter;
