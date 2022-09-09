import React from 'react';

import './App.scss';

import postsFromServer from './api/posts';
import commentsFromServer from './api/comments';
import usersFromServer from './api/users';
import { PostList } from './components/PostList';
import { Comment } from './Types/comments';
import { Post } from './Types/posts';
import { User } from './Types/users';

function comments(postId: number): Comment[] {
  return commentsFromServer.filter(com => com.postId === postId);
}

function user(userId: number): User | null {
  const postUser = usersFromServer.find(human => human.id === userId);

  return postUser || null;
}

const post: Post[] = postsFromServer.map(poost => ({
  ...poost,
  comments: comments(poost.id),
  user: user(poost.userId),
}));

export const App: React.FC = () => (
  <section className="App">
    <h1 className="App__title">Static list of posts</h1>
    <PostList posts={post} />
  </section>
);
