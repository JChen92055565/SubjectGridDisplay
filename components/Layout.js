import React from 'react';
import DataTable from './DataTable';
import Header from './Header'
const HomePage = () => {
  return (
    <div className="default-page">
      <Header/>
      <DataTable/>
    </div>
  );
};

export default HomePage;