import React, { useState, useEffect } from 'react';


const DataTable = () => {

  //Constants 

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [ageSortDirection, setAgeSortDirection] = useState('');
  const [dateSortDirection, setDateSortDirection] = useState('');


  //logic for fetching data initially

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const response = await fetch('https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects');
        if (!response.ok) 
        {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData.data); // Assuming data is nested under 'data' key
      } 
      catch (error) 
      {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  //Logic for handling filtering and sorting changes

  useEffect(() => {
    // Logic for filtering table
    let filtered = data.filter(subject =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (genderFilter !== 'all') 
    {
      filtered = filtered.filter(subject => subject.gender === genderFilter);
    }

    if (statusFilter !== 'all') 
    {
      filtered = filtered.filter(subject => subject.status === statusFilter);
    }

    // Sorting logic for Age column
    if (ageSortDirection === 'asc')
    {
      filtered.sort((a, b) => a.age - b.age);
    } 
    else if (ageSortDirection === 'dsc')
    {
      filtered.sort((a, b) => b.age - a.age);
    }

    // Sorting logic for Diagnosis Date column
    if (dateSortDirection === 'asc')
    {
      filtered.sort((a, b) => new Date(a.diagnosisDate) - new Date(b.diagnosisDate));
    } 
    else if (dateSortDirection === 'dsc') 
    {
      filtered.sort((a, b) => new Date(b.diagnosisDate) - new Date(a.diagnosisDate));
    }
    setFilteredSubjects(filtered);
  }, [searchQuery, data, genderFilter, statusFilter, ageSortDirection, dateSortDirection]);

  //Logic for handling search
  const handleSearchInputChange = event => 
  {
    setSearchQuery(event.target.value);
  };

  //Logic for handling gender filter
  const handleGenderFilterChange = event => 
  {
    setGenderFilter(event.target.value);
  };

  //Logic for handling status filter
  const handleStatusFilterChange = event => 
  {
    setStatusFilter(event.target.value);
  };


  //Logic for shifting states of handling dates and age sorting direction
  const handleAgeSort = () => 
  {
    setDateSortDirection('')
    if (ageSortDirection === '') 
    {
      setAgeSortDirection('asc');
    } 
    else if (ageSortDirection === 'asc')
    {
      setAgeSortDirection('dsc');
    } 
    else 
    {
      setAgeSortDirection('');
    }
  };

  const handleDateSort = () => 
  {

    setAgeSortDirection('');
    if (dateSortDirection === '')
    {
      setDateSortDirection('asc');
    }
    else if (dateSortDirection === 'asc')
    {
      setDateSortDirection('dsc');
    }
    else
    {
      setDateSortDirection('');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ padding: '0.5rem', marginRight: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
        />
        <select className = "dropdown"
          value={genderFilter}
          onChange={handleGenderFilterChange}
          style={{ padding: '0.5rem', marginRight: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
        >
          <option value="all">Display All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select className = "dropdown"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          style={{ padding: '0.5rem', marginRight: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
        >
          <option value="all">Display All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div style={{ overflowX: 'auto' }}>
      <table className="hoverbox" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
  <thead>
    <tr style={{ backgroundColor: '#f2f2f2' }}>
      <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
      <th style={{ border: '1px solid #ccc', padding: '0.5rem', width: '80px', cursor: 'pointer' }} onClick={handleAgeSort}>
        Age <span style={{ fontSize: '12px' }}>{ageSortDirection === 'asc' ? '↑' : ageSortDirection === 'dsc' ? '↓' : ''}</span>
      </th>
      <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Gender</th>
      <th style={{ border: '1px solid #ccc', padding: '0.5rem', width: '120px', cursor: 'pointer' }} onClick={handleDateSort}>
        Diagnosis Date <span style={{ fontSize: '12px' }}>{dateSortDirection === 'asc' ? '↑' : dateSortDirection === 'dsc' ? '↓' : ''}</span>
      </th>
      <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Status</th>
    </tr>
  </thead>
  <tbody>
    {filteredSubjects.map((subject, index) => (
      <tr key={subject.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2' }}>
        <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{subject.name}</td>
        <td style={{ border: '1px solid #ccc', padding: '0.5rem', width: '80px' }}>{subject.age}</td>
        <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{subject.gender}</td>
        <td style={{ border: '1px solid #ccc', padding: '0.5rem', width: '120px' }}>{new Date(subject.diagnosisDate).toLocaleDateString()}</td>
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