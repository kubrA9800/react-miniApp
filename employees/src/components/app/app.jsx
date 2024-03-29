import React, { Component } from 'react'
import './app.css'
import AppInfo from '../app-info/AppInfo';
import SearchPanel from '../search-panel/SearchPanel';
import AppFilter from '../app-filter/AppFilter';
import EmployeesList from '../employees-list/EmployeesList';
import EmployeesAddForm from '../employees-add-form/EmployeesAddForm';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { name: 'John', salary: 500, increase: false, rise: true, id: 1 },
                { name: 'Kubra', salary: 3000, increase: true, rise: false, id: 2 },
                { name: 'Karl', salary: 5000, increase: false, rise: false, id: 3 }
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }


    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleIncrease = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index]
            const newItem = { ...old, increase: !old.increase }
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return {
                data: newArr
            }

        })
    }

    onToggleRise = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index]
            const newItem = { ...old, rise: !old.rise }
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return {
                data: newArr
            }

        })
    }

    searchEmp = (items, term,) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect=(filter)=>{
        this.setState({filter});
    }


    render() {
        const { data, term, filter } = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term),filter);
        return (
            <div className='app'>
                <AppInfo employees={employees} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise} />
                <EmployeesAddForm
                    onAdd={this.addItem} />

            </div>
        )
    }

}

export default App;
