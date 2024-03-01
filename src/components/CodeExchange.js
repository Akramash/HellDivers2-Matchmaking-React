// src/components/CodeExchange.js
import React, { useState } from 'react';

const CodeExchange = ({ onExchange }) => {
    const [code, setCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onExchange(code);
        setCode(''); // Reset the form
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="code">Friend Code:</label>
                <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <button type="submit">Exchange Code</button>
            </form>
        </div>
    );
};

export default CodeExchange;
