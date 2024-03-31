 import React, { useState } from 'react';

 function AddPostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {author, setAuthor} = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Naive submission (no validation or sanitization)
        fetch ('/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, author })
        })
        .then(() => {
            // Add logic to update the post list on success
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add input fields for title, content and author */}
        </form>
    );
 }