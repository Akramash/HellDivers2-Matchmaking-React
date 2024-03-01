import React, { useState, useEffect } from 'react';

const Home = ({ user }) => {
    const [teams, setTeams] = useState([]);
    const [userTeamId, setUserTeamId] = useState(null);

    const fetchTeams = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/GetTeamRequests');
            if (!response.ok) throw new Error('Failed to fetch teams');
            
            const data = await response.json();
            // Correctly adjust teams data to reflect members needed accurately
			const adjustedTeams = data.map(team => ({
				...team,
				membersNeeded: 4 - team.members, // Reflects slots available for joining
			}));
            setTeams(adjustedTeams);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    const fetchUserTeamId = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/getUserInfo?userId=${user.username}`);
            if (!response.ok) throw new Error('Failed to fetch user team ID');
            
            const data = await response.json();
            setUserTeamId(data.ActiveTeamId);
        } catch (error) {
            console.error('Error fetching user team ID:', error);
        }
    };

    useEffect(() => {
        fetchTeams();
        if (user && user.username) {
            fetchUserTeamId();
        }
    }, [user]);

    const handleTeamAction = async (teamId, action) => {
        if (!user || !user.username) {
            console.error('User data is not available.');
            return;
        }

        const bodyContent = { 
            userId: user.username, 
            teamId, 
            action 
        };

        try {
            const response = await fetch(`http://localhost:3001/api/${action}Team`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent),
            });

            if (!response.ok) throw new Error(`Failed to ${action} team`);

            // Refresh the team list and user's current team ID
            await fetchTeams(); 
            await fetchUserTeamId(); 
        } catch (error) {
            console.error(`Failed to ${action} team:`, error);
        }
    };

    return (
        <div>
            <h1>Active Team Requests</h1>
            <div style={{ textAlign: 'right', marginRight: '20px' }}>Hello, {user?.username || "Guest"}</div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Members Needed</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr key={index}>
                            <td>{team.title}</td>
                            <td>{team.membersNeeded} Needed</td>
                            <td>{team.level}</td>
                            <td>
                                {team.membersNeeded > 0 && (!userTeamId || userTeamId !== team.teamId) && (
                                    <button onClick={() => handleTeamAction(team.teamId, 'join')}>Join</button>
                                )}
                                {userTeamId === team.teamId && (
                                    <button onClick={() => handleTeamAction(team.teamId, 'leave')}>Leave</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;