import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching repositories');
      setRepos([]);
    }
  };

  return (
    <div className="container mt-5">
      <h1>GitHub Repositories Portfolio</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter GitHub username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Fetch Repos</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <div className="row mt-5">
        {repos.map(repo => (
          <div key={repo.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{repo.name}</h5>
                <p className="card-text">{repo.description}</p>
                <p className="card-text"><strong>Language:</strong> {repo.language}</p>
                <p className="card-text"><strong>Stars:</strong> {repo.stargazers_count}</p>
                <p className="card-text"><strong>Forks:</strong> {repo.forks_count}</p>
                <a href={repo.html_url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;