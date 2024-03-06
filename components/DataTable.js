import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setSubjects(responseData.data); // Assuming the data is nested under 'data' key
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter subjects based on the search query, gender, and status
    let filtered = subjects.filter(subject =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (genderFilter !== 'all') {
      filtered = filtered.filter(subject => subject.gender === genderFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(subject => subject.status === statusFilter);
    }

    setFilteredSubjects(filtered);
  }, [searchQuery, subjects, genderFilter, statusFilter]);

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleGenderFilterChange = event => {
    setGenderFilter(event.target.value);
  };

  const handleStatusFilterChange = event => {
    setStatusFilter(event.target.value);
  };

  return (
    <div>
      <h2>Subject Table</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <select value={genderFilter} onChange={handleGenderFilterChange}>
        <option value="all">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select value={statusFilter} onChange={handleStatusFilterChange}>
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
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
          {filteredSubjects.map((subject, index) => (
            <tr key={subject.id}>
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