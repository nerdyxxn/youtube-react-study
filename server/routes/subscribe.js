const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    // subscribe : userTo를 구독하는 모든 케이스가 들어있음
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});

module.exports = router;
