import React,{useState} from 'react';
import './comment.css';

const CommentInput = () => {
    const [comment, setComment] = useState("");
    
     const commentHandler = (e) => {
       setComment(e.target.value);
     };
    
    
    return (
      <form className='comment__form'>
        <input
          type="text"
          name="comment"
          placeholder="Add your comment..."
          onChange={commentHandler}
          value={comment}
        />
        <i className="location arrow icon"></i>
      </form>
    );
}
 
export default CommentInput;