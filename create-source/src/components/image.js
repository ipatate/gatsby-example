import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';

const Image = ({ filename, alt }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(filename);
      });
      if (!image) {
        return null;
      }

      const { fluid } = image.node.childImageSharp;
      return <Img alt={alt} fluid={fluid} />;
    }}
  />
);

Image.defaultProps = {
  alt: ''
};

export default Image;
