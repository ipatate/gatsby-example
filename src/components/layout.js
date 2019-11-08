import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const Layout = ({ children, page }) => {
  const { site } = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  return (
    <div className={`container ${page || 'global'}-content`}>
      <div className="hero">
        <Link to="/">{site.siteMetadata.title}</Link>
      </div>
      <div className="main">{children}</div>
      <footer>
        <a
          href="https://unsplash.com/@jamesponddotco?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from James Pond"
        >
          <span style={{ display: 'inline-block', padding: '2px 3px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" styles={{ fill: 'white' }} viewBox="0 0 32 32">
              <title>unsplash-logo</title>
              <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
            </svg>
          </span>
          <span style={{ display: 'inline-block', padding: '2px 3px' }}>Photo by James Pond</span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
