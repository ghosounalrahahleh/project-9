import React, { useState } from "react";
import Comment from "./Comment.jsx";
import CommentApproval from "./CommentApproval.jsx";
import moment from "moment";
import faker from "@faker-js/faker";
const Form = ({
  comments,
  setComments,
  approvedComments,
  setApprovedComments,
  display,
  setDisplay,
}) => {
  // const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // const nameHandler = (e) => {
  //   setName(e.target.value);
  // };
console.log();
  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
      
      setComments([
        ...comments,
        {
          name: sessionStorage.getItem("currentUser")
            ? JSON.parse(sessionStorage.getItem("currentUser"))[0].name
            : "",
          Comment: comment,
          id: Math.random() * 1000,
          date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        },
      ]);
    // setName("");
    setComment("");
    setDisplay(false);
  };
  const showHandler = () => {
    setDisplay(true);
  };
  return (
    <div className="content" >
     
      {display ? (
        <form className="ui form" onSubmit={submitHandler}>
        <div className="field">
          <label>Your Comment</label>
          <input
            type="text"
            name="comment"
            onChange={commentHandler}
            value={comment}
          />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
      ) : (
        <button className="ui button" type="submit" >
          Add comment &nbsp; <i className="plus icon"></i>
        </button>
      )}
      {approvedComments.map((comment) => (
        <div className="card comment" key={comment.id}>
          
          <Comment comment={comment} avatar={faker.image.avatar()} />
        </div>
      ))}
      <CommentApproval
        comments={comments}
        setComments={setComments}
        approvedComments={approvedComments}
        setApprovedComments={setApprovedComments}
      />
    </div>
  );
};
export default Form;
