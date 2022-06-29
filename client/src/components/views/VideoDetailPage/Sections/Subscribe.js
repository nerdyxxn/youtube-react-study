import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Subscribe(props) {
  const [SubscribeNumber, SetSubscribeNumber] = useState(0);

  useEffect(() => {
    let variable = { userTo: props.userTo };
    Axios.post('/api/subscribe/subscribeNumber', variable).then((response) => {
      if (response.data.success) {
        SetSubscribeNumber(response.data.subscribeNumber);
        console.log(SubscribeNumber);
      } else {
        alert('구독자 수 정보 받아오기 실패!');
      }
    });
  }, []);

  return (
    <div>
      <button
        style={{
          backgroundColor: '#CC0000',
          borderRadius: '4px',
          color: '#fff',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
          border: '0',
        }}
      >
        0 Subscribe
      </button>
    </div>
  );
}

export default Subscribe;
