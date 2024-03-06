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
        setSubjects(responseData.data); // Assuming data is nested under 'data' key
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
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Subject Table</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ padding: '0.5rem', marginRight: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
        />
        <select
          value={genderFilter}
          onChange={handleGenderFilterChange}
          style={{ padding: '0.5rem', marginRight: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
        >
          <option value="all">Display All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          style={{ padding: '0.5rem', marginRight: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
        >
          <option value="all">Display All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Age</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Gender</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Diagnosis Date</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject, index) => (
              <tr key={subject.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2' }}>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{subject.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{subject.age}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{subject.gender}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{new Date(subject.diagnosisDate).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{subject.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;