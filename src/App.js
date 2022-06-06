import './App.css';
import EditableTable from './components/EditableTable';
import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from './store';

function App() {
	const [store, setStore] = useContext(StoreContext);
	const [columns, setColumns] = useState([]);

	useEffect(() => {
		fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
			.then(res => res.json())
			.then(data => {
				setStore(state => {
					return { ...state, users: data }
				});
				setStore(state => {
					return { ...state, filteredUsers: data }
				});
			});
	}, []);

	useEffect(() => {
		setColumns(Object.keys(store?.users?.[0] ? store.users[0] : { id: '', name: '', email: '', role: '' }));
	}, [store]);

	function handleFilterChange(e) {
		const queryStr = e.target.value;
		console.log(queryStr);
		setStore(state => {
			const filteredUsers = store.users.filter(user =>
				user.name.includes(queryStr) || user.email.includes(queryStr) || user.role.includes(queryStr) || !queryStr
			);
			console.log({filteredUsers});
			return { ...state, filteredUsers }
		}
		);
	}

	return (
		<div className="App">
			<div className='root-container'>
				<img 
				height={86}
				width={169}
				src={"https://geektrust.sgp1.cdn.digitaloceanspaces.com/assets/images/adminui-badge.png"} 
				alt="Admin-UI" 
				/>
				<div className='text-primary h5'><strong>Admin-UI</strong></div>
				<input className='form-control mt-5 mb-3' placeholder='Search'
					onChange={handleFilterChange}
				/>
				{store?.filteredUsers ?
					<EditableTable data={store.filteredUsers} columns={columns} pageSize={10} rowKey={'id'} /> : null
				}
			</div>
		</div>
	);
}

export default App;
