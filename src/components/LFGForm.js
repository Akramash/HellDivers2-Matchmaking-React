// src/components/LFGForm.js
import React, { useState } from 'react';

const LFGForm = ({ onAdd }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(username);
        setUsername(''); // Reset the form
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default LFGForm;
