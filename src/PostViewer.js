import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      body
    }
  }
`;

function test(data) {
    console.log('text', data)
}

export default () => (
  <Query query={GET_POSTS}>
  {({ loading, data }) => !loading && (
    <React.Fragment>
      <thead>
        <tr>
          <th>Author</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {test(data)}
        {data && data.posts.map(post => (
          <tr key={post.id}>
            <td>{post.author}</td>
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </React.Fragment>
  )}
  </Query>
);