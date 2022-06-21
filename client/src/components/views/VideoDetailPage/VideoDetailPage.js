import React, { useEffect } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VideoDetailPage() {
  const { videoId } = useParams();
  const variable = { videoId: videoId };

  useEffect(() => {
    axios.post('/api/video/getVideoDetail', variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert('비디오 정보 가져오기 실패!');
      }
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
          <video style={{ width: '100%' }} src controls />
          <List.Item actions>
            <List.Item.Meta avatar title description />
          </List.Item>
          {/* Comment */}
        </div>
      </Col>
      <Col lg={6} xs={24}>
        Side Videos
      </Col>
    </Row>
  );
}

export default VideoDetailPage;
