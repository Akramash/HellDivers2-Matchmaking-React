// RequestTeam.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const RequestTeam = ({ user, onNewTeamAdded }) => {
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('Easy');
    const [membersNeeded, setMembersNeeded] = useState('3');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const teamId = uuidv4();
        // Convert "membersNeeded" to the correct value for the "members" field
        const members = 4 - parseInt(membersNeeded, 10); // This correctly calculates total members including the creator

        try {
            const addResponse = await fetch('http://localhost:3001/api/addTeamRequest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teamId, title, members, level }),
            });

            if (!addResponse.ok) throw new Error('Failed to add team request.');

            // Join the newly created team automatically
            const joinResponse = await fetch('http://localhost:3001/api/joinTeam', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.username, teamId, action: 'join' }),
            });

            if (!joinResponse.ok) throw new Error('Failed to join the newly created team.');

            setMessage('Team request added and joined successfully!');
            setIsError(false);

            if (typeof onNewTeamAdded === 'function') onNewTeamAdded();

        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Create a New Team</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Team Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="level">Level:</label>
                <select id="level" value={level} onChange={e => setLevel(e.target.value)}>
                    {/* Level options */}
                    <option value="Trivial">Trivial</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Hard">Hard</option>
                    <option value="Extreme">Extreme</option>
                    <option value="Suicide Mission">Suicide Mission</option>
                    <option value="Impossible">Impossible</option>
                    <option value="Helldive">Helldive</option>
                </select>
                <label htmlFor="membersNeeded">Members Needed:</label>
                <select id="membersNeeded" value={membersNeeded} onChange={e => setMembersNeeded(e.target.value)}>
                    <option value="3">3 (You + 3 more)</option>
                    <option value="2">2 (You + 2 more)</option>
                    <option value="1">1 (You + 1 more)</option>
                </select>
                <button type="submit" disabled={isSubmitting}>Request Team</button>
            </form>
            {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default RequestTeam;