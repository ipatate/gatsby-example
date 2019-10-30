import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout.js';
import SEO from '../components/seo.js';

const Home = ({ data }) => (
  <Layout>
    <SEO />
    <div>
      {data.allPost.nodes.map(p => (
        <div className="post-list-element" key={p._id}>
          <div className="post-list-img">
            <Link className="post-list-link" to={`/${p.slug}`}>
              &#160;
            </Link>
          </div>
          <div className="post-list-content">
            <h2>
              <Link className="post-list-link" to={`/${p.slug}`}>
                {p.title}
              </Link>
            </h2>
            <div className="post-list-meta">
              <strong>
                By <Link to={`/author/${p.user[0]._id}`}>{p.user[0] ? p.user[0].username : ''}</Link>
              </strong>{' '}
              {p.allComments.length} comments
            </div>
            <p className="post-list-body">{p.body}</p>
            <Link className="post-list-link" to={`/${p.slug}`}>
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allPost {
      nodes {
        title
        slug
        user {
          name
          _id
          username
        }
        allComments {
          _id
          body
          email
          name
        }
        body
        _id
      }
    }
  }
`;

export default Home;
