import React from 'react';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { graphql, Link } from 'gatsby';

const Post = ({ data }) => (
  <Layout page="post">
    <SEO title={data.post.title} />
    <div className="breadcrumb">
      <Link to="/">Home</Link>
      <span>{data.post.title}</span>
    </div>
    <h1 className="post-title">{data.post.title}</h1>
    <div className="post-list-meta">
      <Link to={`/author/${data.post.user[0]._id}`}>By {data.post.user[0] ? data.post.user[0].username : ''}</Link>{' '}
      <a href="#comments">{data.post.allComments.length} comments</a>
    </div>
    <p className="post-body">{data.post.body}</p>
    <Image filename="james-pond.jpg" />
    <div id="comments" className="post-comments-list">
      <h3>Comments</h3>
      {data.post.allComments.map(c => (
        <div key={c._id} className="comment-container">
          <strong>By {c.name}</strong>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query PostQuery($_id: Int!) {
    post(_id: { eq: $_id }) {
      body
      _id
      title
      user {
        username
        _id
      }
      allComments {
        body
        _id
        email
        name
      }
    }
  }
`;

export default Post;
