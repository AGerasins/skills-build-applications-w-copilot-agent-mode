import React, { useEffect, useState } from 'react';

const Activities = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : '/api/activities/';
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [apiUrl]);

  const handleShow = (item) => {
    setSelected(item);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <h2 className="mb-4 display-6">Activities</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Track your recent activities</h5>
          <p className="card-text">Click on a row to view details in a modal.</p>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Workout</th>
            <th>Date</th>
            <th>Duration (min)</th>
            <th>Calories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id || idx} onClick={() => handleShow(item)} style={{cursor:'pointer'}}>
              <td>{idx + 1}</td>
              <td>{item.user || '-'}</td>
              <td>{item.workout || '-'}</td>
              <td>{item.date ? new Date(item.date).toLocaleString() : '-'}</td>
              <td>{item.duration_minutes || '-'}</td>
              <td>{item.calories_burned || '-'}</td>
              <td><button className="btn btn-sm btn-outline-primary" onClick={e => {e.stopPropagation(); handleShow(item);}}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(selected, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
