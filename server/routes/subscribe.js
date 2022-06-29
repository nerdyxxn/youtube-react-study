const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//=================================
//             Subscribe
//=================================

// 구독자 수 정보 가져오기
router.post('/subscribeNumber', (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    // subscribe : userTo를 구독하는 모든 케이스가 들어있음
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});

// 구독중인지 정보 가져오기
router.post('/subscribed', (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    // subscribe length가 0이면 구독을 안 하고 있는 상태
    if (err) return res.status(400).send(err);
    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, subscribed: result });
  });
});

// 구독 취소
router.post('/unSubscribe', (req, res) => {
  // DB에서 userTo와 userFrom을 삭제
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

// 구독 기능
router.post('/subscribe', (req, res) => {
  // DB에 userTo와 userFrom을 저장하기
  const subscribe = new Subscriber(req.body);
  subscribe.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
