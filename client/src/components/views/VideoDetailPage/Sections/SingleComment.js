import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function SingleComment({ comment, refreshFunction }) {
  const { videoId } = useParams();
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  const onHandleChange = (e) => {
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
      // 대댓글이기 때문에 responseTo 프로퍼티 필요
      responseTo: comment._id,
    };

    Axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue('');
        setOpenReply(false);
        refreshFunction(response.data.result);
      } else {
        alert('댓글 저장 실패!');
      }
    });
  };

  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} alt="thumb" />}
        content={<p>{comment.content}</p>}
      />

      {OpenReply && (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="댓글을 작성해주세요"
          />
          <br />
          <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
