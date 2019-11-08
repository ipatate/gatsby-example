const axios = require('axios');
const slugify = require('slugify');

/**
 *  create node object with data
 *  @param {object} data
 *  @param {string} type
 *  @param {object} methods
 *
 *  @return node source
 */
const createNodeObject = (data, type = 'Post', methods) => {
  const { actions, createNodeId, createContentDigest } = methods;
  const { createNode } = actions;
  const nodeContent = JSON.stringify(data);

  const nodeMeta = {
    id: createNodeId(`post-${data.id}`),
    parent: null,
    children: [],
    internal: {
      type,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(data)
    }
  };
  // use _id instead of id
  data._id = data.id;
  data.slug = data.title ? slugify(data.title) : null;
  const node = Object.assign({}, data, nodeMeta);

  return createNode(node);
};

/**
 *
 * @param {object} infos
 * @param {object} methods
 */
const callAPI = async (infos = { url: '', type: '' }, methods) => {
  // call api
  const { data } = await axios.get(infos.url);
  // create node
  data.forEach(d => createNodeObject(d, infos.type, methods));
  return Promise.resolve();
};

exports.sourceNodes = async methods =>
  await Promise.all([
    callAPI({ type: 'Post', url: 'https://jsonplaceholder.typicode.com/posts' }, methods),
    callAPI({ type: 'Comment', url: 'https://jsonplaceholder.typicode.com/comments' }, methods),
    callAPI({ type: 'User', url: 'https://jsonplaceholder.typicode.com/users' }, methods)
  ]);

// link comments and user to post
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Post: {
      allComments: {
        type: ['Comment'],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                postId: { eq: source._id }
              }
            },
            type: 'Comment'
          });
        }
      },
      user: {
        type: '[User!]',
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: {
              limit: 1,
              filter: {
                _id: { eq: source.userId }
              }
            },
            type: 'User'
          });
        }
      }
    }
  };
  createResolvers(resolvers);
};

/**
 * create post page
 */
exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
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
  `);
  const authors = {};
  data.allPost.nodes.forEach(post => {
    actions.createPage({
      path: post.slug,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        _id: post._id
      }
    });
    const [first] = post.user;
    if (!authors[first._id]) {
      authors[first._id] = first;
    }
  });

  Object.keys(authors).map(key => {
    actions.createPage({
      path: `/author/${authors[key]._id}`,
      component: require.resolve(`./src/templates/author.js`),
      context: {
        _id: authors[key]._id
      }
    });
  });
};
