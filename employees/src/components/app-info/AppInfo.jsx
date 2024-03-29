import React from 'react';
import './AppInfo.css';

const AppInfo = ({increased,employees}) => {
  return (
    <div className="app-info">
      <h1>Company's Employees List</h1>
      <h2>Employees' quantity:{employees}</h2>
      <h2>The award will be received by:{increased}</h2>
    </div>
  )
}

export default AppInfo
