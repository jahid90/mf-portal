const express = require('express');
const router = express.Router();

const navigationService = require('../services/navigation');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const headerContent = await navigationService.getHeader();

    res.render('index',
      {
        title: 'Express',
        version: process.env.VERSION || '0.0.0',
        header: headerContent
      }
    );
  } catch (err) {
    throw err;
  }
});

module.exports = router;
