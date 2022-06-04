import './App.css';
import EditableTable from './components/Table';

function App() {
  const data = [{name: 'Ram', email: 'ram@gmail.com'}, {name:'Krishna', email: 'krishna@gmail.com'}];

  return (
    <div className="App">
      <div className='root-container'>
        <input placeholder='Search' />
          <EditableTable data={data} />
      </div>
    </div>
  );
}

export default App;
