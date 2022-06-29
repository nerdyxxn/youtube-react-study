import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Subscribe(props) {
  const [SubscribeNumber, SetSubscribeNumber] = useState(0);
  const [Subscribed, SetSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };

    Axios.post('/api/subscribe/subscribeNumber', variable).then((response) => {
      if (response.data.success) {
        SetSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert('구독자 수 정보 받아오기 실패!');
      }
    });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    Axios.post('/api/subscribe/subscribed', subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          SetSubscribed(response.data.subscribed);
        } else {
          alert('구독중인지에 대한 정보 받아오기 실패!');
        }
      }
    );
  }, []);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };

    if (Subscribed) {
      // 이미 구독중이라면 -> 구독 취소 기능 수행
      Axios.post('/api/subscribe/unSubscribe', subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            SetSubscribeNumber(SubscribeNumber - 1);
            SetSubscribed(!Subscribed);
          } else {
            alert('구독 취소하기 실패!');
          }
        }
      );
    } else {
      // 구독중이 아니라면 -> 구독 기능 수행
      Axios.post('/api/subscribe/subscribe', subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            SetSubscribeNumber(SubscribeNumber + 1);
            SetSubscribed(!Subscribed);
          } else {
            alert('구독하기 실패!');
          }
        }
      );
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? '#AAA' : '#CC0000'}`,
          borderRadius: '4px',
          color: '#fff',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
          border: '0',
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;
