import './App.css';
import EditableTable from './components/Table';
import React, { useState, useEffect } from 'react';

function App() {
	const [users, setUsers] = useState();
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState();

	useEffect(() => {
		fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
			.then(res => res.json())
			.then(data => {
				setData(data);
				setUsers(data);
			});
	}, []);

	useEffect(() => {
		setColumns(Object.keys(data?.[0] ? data?.[0] : {}));
	}, [data]);

	function handleFilterChange(e) {
		const queryStr = e.target.value;
		console.log(queryStr);
		setUsers(
			data.filter(user =>
				user.name.includes(queryStr) || user.email.includes(queryStr) || user.role.includes(queryStr) || !queryStr
			)
		);
	}

	return (
		<div className="App">
			<div className='root-container'>
				<input placeholder='Search'
					onChange={handleFilterChange}
				/>
				<EditableTable data={users} columns={columns} />
			</div>
		</div>
	);
}

export default App;
