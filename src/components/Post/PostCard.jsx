import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import faker from "@faker-js/faker";
import CommentInput from "../Comments/CommentInput";
import Comment from "../Comments/Comment";
import { useNavigate } from "react-router-dom";

const PostCard = ({
  posts,
  setPosts,
  display,
  setDisplay,
  LoggedIn,
  setLoggedIn,
  comments,
  setComments,
}) => {
  let navigate = useNavigate;
  const [currentUser, setCurrentUser] = useState();
  const showHandler = () => {
    setDisplay(true);
  };

  useEffect(() => {
  
  if (sessionStorage.getItem("currentUser"))
   { var user = JSON.parse(sessionStorage.getItem("currentUser"));}
    setCurrentUser(user);
    if (localStorage.getItem("comments")) {
      var localComments = JSON.parse(localStorage.getItem("comments"));
    }
     if (localStorage.getItem("posts")) {
       var localPosts = JSON.parse(localStorage.getItem("posts"));
     }
    console.log(localComments);
    setPosts([localPosts]);
    setComments([localComments]);
  }, [setPosts, setComments, setCurrentUser]);

  return (
    <div className="content">
      {display ? (
        <PostForm
          posts={posts}
          setPosts={setPosts}
          display={display}
          setDisplay={setDisplay}
          LoggedIn={LoggedIn}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <button className="ui button" type="submit" onClick={showHandler}>
          Add post &nbsp; <i className="plus icon"></i>
        </button>
      )}

      {localStorage.getItem("posts") === null
        ? "No posts yet"
        : JSON.parse(localStorage.getItem("posts")).map((post) => (
            <div className="ui card post" key={post.id}>
              <div className="content">
                <div className="right floated meta">{post.date}</div>
                <img
                  className="ui avatar image"
                  alt={post.name}
                  src={JSON.parse(sessionStorage.getItem("currentUser")).image}
                />
                {post.name}
              </div>
              <div className="extra content">
                <div className="ui large transparent left icon input post__content">
                  {post.content}
                </div>
              </div>
              {post.image ? (
                <div className="image">
                  <img src={post.image} alt="post" />
                </div>
              ) : (
                ""
              )}

              <div className="extra content">
                <div className="ui large transparent left icon input">
                  <CommentInput
                    postId={post.id}
                    comments={comments}
                    setComments={setComments}
                  />
                </div>
              </div>
              <div className="extra content">
                {localStorage.getItem("comments") === null
                  ? ""
                  : JSON.parse(localStorage.getItem("comments")).map(
                      (comment) =>
                        comment.postId === post.id ? (
                          <Comment
                            comment={comment}
                            id={comment.id}
                            key={comment.id}
                            comments={comments}
                            setComments={setComments}
                            currentUser={currentUser}
                          />
                        ) : (
                          ""
                        )
                    )}
              </div>
            </div>
          ))}
    </div>
  );
};
export default PostCard;
