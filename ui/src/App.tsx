import { CssBaseline } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Authors from './Pages/Authors';
import AddBook from './Pages/Books/AddBook';
import Books from './Pages/Books/Books';

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/books" element={<Books />} />
            <Route path="/books/add" element={<AddBook />} />
            <Route path="/authors" element={<Authors />} />
          </Route>
        </Routes>
      </CssBaseline>
    </div>
  );
}

export default App;
