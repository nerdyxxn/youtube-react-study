const express = require('express');
const router = express.Router();
const { Video } = require('../models/User');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
var ffmpeg = require('fluent-ffmpeg');

// Storage Multer Config
const storage = multer.diskStorage({
  // 업로드한 파일 저장할 위치 경로
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // 저장할 때 사용할 파일 이름 형식
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// mime type 체크하여 원하는 타입만 업로드 하도록 필터링 처리
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'video/mp4') {
    cb(null, true);
  } else {
    cb({ msg: 'mp4 파일만 업로드 가능합니다.' }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  'file'
);

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
  // 비디오를 서버에 업로드
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      // 비디오 업로드 성공하면 클라이언트에 파일경로와 파일이름을 전달
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    }
  });
});

router.post('/thumbnail', (req, res) => {
  let filePath = '';
  let fileDuration = '';

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.filePath, (err, metadata) => {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.filePath)
    // 썸네일 파일이름 생성
    .on('filenames', (filenames) => {
      console.log('Will generate ' + filenames.join(', '));
      console.log(filenames);

      filePath = 'uploads/thumbnails/' + filenames[0];
    })
    // 썸네일 생성하고 난 후 동작
    .on('end', () => {
      console.log('Screenshots taken!');
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on('error', (err) => {
      console.error(err);
      return res.json({ success: false, err });
    })
    // 썸네일 생성 관련 옵션
    .screenshot({
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      filename: 'thumbnail-%b.png',
    });
});

module.exports = router;
