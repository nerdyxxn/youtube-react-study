import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment({ commentList, refreshFunction, parentCommentId }) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    commentList.map((comment, i) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [commentList]);

  const renderReplyComment = () =>
    commentList.map((comment, i) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
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
          </div>
        )}
      </>
    ));

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{
            fontSize: '14px',
            margin: 0,
            color: 'gray',
            paddingLeft: '45px',
            paddingBottom: '16px',
            color: '#5DA4F8',
            cursor: 'pointer',
          }}
          onClick={onHandleChange}
        >
          답글 {ChildCommentNumber}개
        </p>
      )}
      {OpenReplyComments && renderReplyComment()}
    </div>
  );
}

export default ReplyComment;
