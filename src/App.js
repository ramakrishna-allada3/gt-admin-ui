import './App.css';
import EditableTable from './components/Table';
import React, { useState, useEffect } from 'react';

function App() {
	const [users, setUsers] = useState();
	const [columns, setColumns] = useState([]);
	useEffect(() => {
		fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
			.then(res => res.json())
			.then(data => setUsers(data));
	}, []);

	useEffect(() => {
	  setColumns(Object.keys(users?.[0] ? users?.[0] : {}));
	}, [users]);

	return (
		<div className="App">
			<div className='root-container'>
				<input placeholder='Search' />
				<EditableTable data={users} columns={columns}/>
			</div>
		</div>
	);
}

export default App;
