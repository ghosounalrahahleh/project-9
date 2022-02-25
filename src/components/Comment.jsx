import React from "react";

const Comment = (props) => {
  console.log(props.comment);
  return (
  
      <div className="ui comments">
        <div className="comment">
          <a className="avatar">
            <img src={props.avatar} />
          </a>
          <div className="content">
            <a className="author"> {props.comment.name}</a>
            <div className="metadata">
              <span className="date">{props.comment.date}</span>
            </div>
            <div className="text">{props.comment.Comment}</div>
          </div>
        </div>
      </div>
   
  );
};
export default Comment;
