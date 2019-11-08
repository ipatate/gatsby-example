import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';

const User = ({ data }) => (
  <Layout>
    <div className="breadcrumb">
      <Link to="/">Home</Link>
      <span>{data.user.username}</span>
    </div>
    <h1 className="post-title">{data.user.username}</h1>
    <p className="post-body">
      {data.user.name}
      <br />
      {data.user.email}
      <br />
      {data.user.phone}
      <br />
      {data.user.website}
      <br />
      <hr />
      {data.user.address.street}
      <br />
      {data.user.address.zipcode} {data.user.address.city}
      <br />
    </p>
  </Layout>
);

export const query = graphql`
  query AuthorsQuery($_id: Int!) {
    user(_id: { eq: $_id }) {
      phone
      username
      website
      name
      email
      _id
      address {
        city
        street
        zipcode
      }
    }
  }
`;

export default User;
