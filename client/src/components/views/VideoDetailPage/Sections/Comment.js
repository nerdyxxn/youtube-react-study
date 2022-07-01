import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function Comment() {
  const { videoId } = useParams();
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState('');

  const handleClick = (e) => {
    const {
      target: { value },
    } = e;
    setCommentValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      // postId = videoId
      content: CommentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
      } else {
        alert('댓글 저장 실패!');
      }
    });
  };

  return (
    <div>
      <br />
      <p>Comments</p>
      <hr />
      {/* Comment Lists */}
      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleClick}
          placeholder="댓글을 작성해주세요"
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
