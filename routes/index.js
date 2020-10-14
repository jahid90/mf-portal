const express = require('express');
const router = express.Router();

const navigationService = require('../services/navigation');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const headerContent = await navigationService.getHeader();
    const footerContent = await navigationService.getFooter();

    res.render('index',
      {
        title: 'Express',
        header: headerContent,
        footer: footerContent
      }
    );
  } catch (err) {
    throw err;
  }
});

module.exports = router;
