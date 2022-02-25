import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import faker from "@faker-js/faker";
import CommentInput from "../Comments/CommentInput";

const PostCard = ({ posts, setPosts, display, setDisplay }) => {

  //var localPosts = JSON.parse(localStorage.getItem("posts"));
  const showHandler = () => {
    setDisplay(true);
  };
  console.log(posts);
  useEffect(() => {
    var localPosts = JSON.parse(localStorage.getItem("posts"));
    console.log(localPosts);
   setPosts([localPosts]);

  }, [setPosts]);
 console.log(posts);
  return (
    <div className="content">
      {display ? (
        <PostForm
          posts={posts}
          setPosts={setPosts}
          display={display}
          setDisplay={setDisplay}
        />
      ) : (
        <button className="ui button" type="submit" onClick={showHandler}>
          Add post &nbsp; <i className="plus icon"></i>
        </button>
      )}

      {JSON.parse(localStorage.getItem("posts")) === null
        ? "No posts yet"
        : JSON.parse(localStorage.getItem("posts")).map((post) => (
            <div className="ui card post" key={post.id}>
              <div className="content">
                <div className="right floated meta">{post.date}</div>
                <img
                  className="ui avatar image"
                  alt={post.name}
                  src={faker.image.avatar()}
                />
                {post.name}
              </div>
              <div className="extra content">
                <div className="ui large transparent left icon input post__content">
                  {post.content}
                </div>
              </div>
              <div className="image">
                <img src={post.image} />
              </div>
              <div className="extra content">
                <div className="ui large transparent left icon input">
                  <i className="heart outline icon"></i>
                  <CommentInput />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};
export default PostCard;
