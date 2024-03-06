import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [genderFilter, statusFilter]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Filter data based on gender and status filters
      const filteredData = data.filter(subject => {
        return (
          (genderFilter === '' || subject.gender === genderFilter) &&
          (statusFilter === '' || subject.status === statusFilter)
        );
      });

      setSubjects(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGenderChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div>
      <h2>Subject Table</h2>
      <div>
        <label htmlFor="genderFilter">Gender:</label>
        <select id="genderFilter" value={genderFilter} onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="statusFilter">Status:</label>
        <select id="statusFilter" value={statusFilter} onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Diagnosis Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>{subject.age}</td>
              <td>{subject.gender}</td>
              <td>{new Date(subject.diagnosisDate).toLocaleDateString()}</td>
              <td>{subject.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;