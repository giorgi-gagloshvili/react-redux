import { Routes, Route } from 'react-router-dom'

import Table from './pages/Table'
import Edit from './pages/Edit'


const App = () => {
  return (
    <div className="container mx-auto px-4">
      <Routes>
        <Route path="/" element={<Table />}/>
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;