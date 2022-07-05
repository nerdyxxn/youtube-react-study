const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//             Like
//=================================

// 좋아요 개수 가져오기
router.post('/getLikes', (req, res) => {
  let variable = {};

  // video일 때와 comment일 때로 구분
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

// 싫어요 개수 가져오기
router.post('/getDislikes', (req, res) => {
  let variable = {};

  // video일 때와 comment일 때로 구분
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Dislike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

// 좋아요 추가하기
router.post('/upLike', (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // Like collection에 좋아요 클릭한 정보를 넣기
  const like = new Like(variable);

  like.save((err, likeResult) => {
    if (err) return res.status(400).send(err);

    // 만약 Dislike이 이미 클릭 되어있다면, Dislike을 -1 하기
    Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
    });
  });
});

// 좋아요 취소하기
router.post('/unLike', (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // Like collection에 저장한 좋아요 클릭 정보를 삭제
  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

// 싫어요 추가하기
router.post('/upDislike', (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // Dislike collection에 싫어요 클릭한 정보를 넣기
  const dislike = new Dislike(variable);

  dislike.save((err, dislikeResult) => {
    if (err) return res.status(400).send(err);

    // 만약 Like이 이미 클릭 되어있다면, Like을 -1 하기
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
    });
  });
});

// 싫어요 취소하기
router.post('/unDislike', (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // Dislike collection에 저장한 좋아요 클릭 정보를 삭제
  Dislike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
