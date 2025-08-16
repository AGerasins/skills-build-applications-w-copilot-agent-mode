import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [apiUrl]);

  return (
    <div>
      <h2 className="mb-4 display-6">Workouts</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Available Workouts</h5>
          <p className="card-text">Browse and try different workouts!</p>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-danger">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id || idx}>
              <td>{idx + 1}</td>
              <td>{item.name || '-'}</td>
              <td>{item.description || '-'}</td>
              <td>{item.difficulty || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workouts;
