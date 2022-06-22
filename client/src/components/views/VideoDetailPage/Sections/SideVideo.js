import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);

  // 페이지 로드 시 DB에 있는 비디오 데이터 가져오기
  useEffect(() => {
    axios.get('/api/video/getVideos').then((response) => {
      if (response.data.success) {
        setSideVideos(response.data.videos);
      } else {
        alert('비디오 가져오기에 실패했습니다!');
      }
    });
  }, []);

  const renderSideVideo = SideVideos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem' }}
      >
        <div style={{ width: '40%', marginRight: '1rem' }}>
          <a href="">
            <img
              style={{ width: '100%', height: '100%' }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>

        <div style={{ width: '50%' }}>
          <a href="" style={{ color: 'gray' }}>
            <span style={{ fontSize: '1rem', color: '#000' }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views}</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return <div style={{ marginTop: '3rem' }}>{renderSideVideo}</div>;
}

export default SideVideo;
