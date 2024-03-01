// src/components/Matchmaking.js
import React, { useState } from 'react';
import LFGForm from './LFGForm';
import CodeExchange from './CodeExchange';

const Matchmaking = () => {
    const [users, setUsers] = useState([]);
    const [codes, setCodes] = useState([]);

    const handleAddUser = (username) => {
        setUsers([...users, username]);
        // Here you might also make a call to your backend to save the user's LFG status
    };

    const handleCodeExchange = (code) => {
        setCodes([...codes, code]);
        // Similarly, handle the code exchange logic, potentially saving the codes to your backend
    };

    return (
        <div>
            <h1>Helldivers Matchmaking</h1>
            <LFGForm onAdd={handleAddUser} />
            <CodeExchange onExchange={handleCodeExchange} />
            <div>
                <h2>Active Users</h2>
                {users.map((user, index) => (
                    <p key={index}>{user}</p>
                ))}
            </div>
            <div>
                <h2>Exchanged Codes</h2>
                {codes.map((code, index) => (
                    <p key={index}>{code}</p>
                ))}
            </div>
        </div>
    );
};

export default Matchmaking;
