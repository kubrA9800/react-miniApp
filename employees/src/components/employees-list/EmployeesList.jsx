import React from 'react'
import EmployeesItem from '../employees-item/EmployeesItem'
import './EmployeesList.css'

const EmployeesList = ({ data, onDelete, onToggleIncrease, onToggleRise }) => {

  const elements = data.map(item => {
    const { id, ...itemProps } = item;
    return (
      <EmployeesItem
        key={id}
        {...itemProps}
        onDelete={() => onDelete(id)} 
        onToggleIncrease={()=>onToggleIncrease(id)}
        onToggleRise={()=>onToggleRise(id)}/>
    )
  })

  return (
    <ul className="app-list list-group">
      {elements}
    </ul>
  )
}

export default EmployeesList
