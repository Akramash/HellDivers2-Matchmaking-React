// App.js
import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import RequestTeam from './components/RequestTeam';

Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/request-team">Request Team</Link>
          {user && <button onClick={signOut}>Sign out</button>}
        </nav>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/request-team" element={<RequestTeam user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);