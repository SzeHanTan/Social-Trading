import React, { useState } from 'react';
import Modal from '../components/Modal';
import '../styles/Forum.css';

const initialPosts = [
  {
    id: 1,
    title: 'Welcome to the Art Forum',
    content: 'Feel free to discuss anything related to art here.',
    comments: []
  },
  {
    id: 2,
    title: 'Favorite Art Styles',
    content: 'What are your favorite art styles and why?',
    comments: []
  }
];

const Forum = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [commentInputs, setCommentInputs] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleAddComment = (postId) => {
    const comment = commentInputs[postId] || '';
    if (comment.trim()) {
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, comment] } 
          : post
      ));
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  const handleSummarize = async (postId) => {
    const post = posts.find(post => post.id === postId);
    const commentsText = post.comments.join('\n');
    setModalVisibility(true);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: 'Summarize the following comments:\n' + commentsText }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch response from server");
      }
      const data = await res.json();
      setModalContent(data.response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="forum-container" style={{ position: 'relative' }}>
      {posts.map(post => (
        <div key={post.id} className="forum-post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="comments-section">
            <h3>Comments</h3>
            {post.comments.map((comment, index) => (
              <div key={index} className="comment">
                {comment}
              </div>
            ))}
            <div className="add-comment">
              <textarea
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                placeholder="Add a comment..."
              />
              <button onClick={() => handleAddComment(post.id)}>Comment</button>
            </div>
          </div>
          <button className="summarize-button" onClick={() => handleSummarize(post.id)}>Summarize</button>
        </div>
      ))}
      {modalVisibility && (
        <Modal
          isOpen={modalVisibility}
          content={modalContent}
          toggleModal={() => setModalVisibility(false)}
        />
      )}
    </div>
  );
};

export default Forum;