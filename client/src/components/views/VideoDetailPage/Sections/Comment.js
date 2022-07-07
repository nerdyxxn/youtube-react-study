import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment({ commentList, refreshFunction }) {
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
        // 댓글 Submit 하면 바로 화면에 보이도록 수정 필요 -> 부모 컴포넌트 state 업데이트 하기
        refreshFunction(response.data.result);
        setCommentValue('');
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
      {commentList &&
        commentList.map(
          (comment, i) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  refreshFunction={refreshFunction}
                  comment={comment}
                  key={i}
                />
                <ReplyComment
                  refreshFunction={refreshFunction}
                  commentList={commentList}
                  parentCommentId={comment._id}
                />
              </>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{
            width: '100%',
            resize: 'none',
            border: '1px solid lightgray',
          }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="댓글을 작성해주세요"
        />
        <br />
        <button
          style={{
            width: '20%',
            height: '52px',
            color: '#fff',
            background: '#3678F5',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
