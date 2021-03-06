
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/PostList.css";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../actions";
import Header from "./Header";
import Moment from 'react-moment';
import { BigHead } from '@bigheads/core'
import { getRandomOptions } from "../css/BigHead";
import moment from "moment";


function PostList() {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList)
  console.log({postList});

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };
  
  
  useEffect(() => {
    dispatch(getPostList());
  }, []);

  
  return (
    <React.Fragment>
      <Header />
    <main className="mt-3 ">
      {postList.sort((a, b) => convertRelativeTime(b.created_at) - convertRelativeTime(a.created_at)).map((yazi) => {
        return (
          <div className="card p-3 mb-2" id="tv" key={yazi.id}>
            <div className="d-flex flex-row">
            <div style={{ width: "60px" }}  className="rounded-circle mr-4">
            <BigHead {...getRandomOptions()} />
             </div>
              <div className="d-flex flex-column ms-2">
                <Link to={`/posts/${yazi.id}`}>
                <h6 className="mb-1 text-primary">{yazi.title}</h6>
                <p className="comment-text">{yazi.content.substring(0, 100)}</p>
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row gap-3 align-items-center">
                <div className="d-flex align-items-center mr-2">
                  <i className="fa fa-heart-o"></i>
                  <span className="ms-1 fs-10 m-1">Like</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fa fa-comment-o"></i>
                  <span className="ms-1 fs-10 m-1">Comments</span>
                </div>
              </div>
              <div className="d-flex flex-row">
                <span className="text-muted fw-normal fs-10">
               {convertRelativeTime(yazi?.created_at)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </main>
    </React.Fragment>
  );
}

export default PostList;
