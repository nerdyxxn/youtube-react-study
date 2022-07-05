import React, { useState, useEffect } from 'react';
import { Tooltip, Icon } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes({ video, videoId, userId, commentId }) {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [Dislikes, setDislikes] = useState(0);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};

  if (video) {
    // VideoDetailPage에서 prop으로 전달받음
    variable = { videoId: videoId, userId: userId };
  } else {
    // SingleComment에서 prop으로 전달받음
    variable = { commentId: commentId, userId: userId };
  }

  useEffect(() => {
    // Like 정보 가져오기
    Axios.post('/api/like/getLikes', variable).then((response) => {
      if (response.data.success) {
        // Like 숫자
        setLikes(response.data.likes.length);
        // 내가 Like 이미 눌렀는지
        response.data.likes.map((like) => {
          if (like.userId === userId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Likes 정보 가져오기 실패!');
      }
    });

    // Dislike 정보 가져오기
    Axios.post('/api/like/getDislikes', variable).then((response) => {
      if (response.data.success) {
        // Dislike 숫자
        setDislikes(response.data.dislikes.length);
        // 내가 Dislike 이미 눌렀는지
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === userId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Dislikes 정보 가져오기 실패!');
      }
    });
  }, []);

  const onLike = () => {
    // Like 버튼이 클릭되어 있지 않은 경우 : 좋아요 + 1
    if (LikeAction === null) {
      Axios.post('/api/like/upLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction('liked');

          // 이미 Dislike 버튼이 클릭되어 있는 경우
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert('좋아요 실패!');
        }
      });
    } else {
      // Like 버튼이 클릭되어 있는 경우 : 좋아요 - 1
      Axios.post('/api/like/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert('좋아요 취소 실패!');
        }
      });
    }
  };

  const onDislike = () => {
    // Dislike 버튼이 클릭되어 있지 않은 경우 : 싫어요 + 1
    if (DislikeAction === null) {
      Axios.post('/api/like/upDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction('disliked');

          // 이미 Like 버튼이 클릭되어 있는 경우
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert('싫어요 실패!');
        }
      });
    } else {
      // Dislike 버튼이 클릭되어 있는 경우 : 싫어요 - 1
      Axios.post('/api/like/unDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert('싫어요 취소 실패!');
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <LikeOutlined
            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
            onClick={onLike}
          />
        </Tooltip>
        <span
          style={{ paddingLeft: '7px', cursor: 'auto', marginRight: '10px' }}
        >
          {Likes}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <DislikeOutlined
            theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '7px', cursor: 'auto' }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
