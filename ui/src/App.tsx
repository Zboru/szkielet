import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import plLocale from 'date-fns/locale/pl';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import AddAuthor from './Pages/Authors/AddAuthor';
import Authors from './Pages/Authors/Authors';
import AddBook from './Pages/Books/AddBook';
import ShowBook from './Pages/Books/ShowBook';
import Books from './Pages/Books/Books';
import SummaryPage from './Pages/SummaryPage';
import ShowAuthor from './Pages/Authors/ShowAuthor';
import EditAuthor from './Pages/Authors/EditAuthor';
import EditBook from './Pages/Books/EditBook';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={plLocale}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="books">
                <Route path="/books" element={<Books />} />
                <Route path="add" element={<AddBook />} />
                <Route path=":id/edit" element={<EditBook />} />
                <Route path=":id" element={<ShowBook />} />
              </Route>
              <Route path="authors">
                <Route path="/authors" element={<Authors />} />
                <Route path="add" element={<AddAuthor />} />
                <Route path=":id/edit" element={<EditAuthor />} />
                <Route path=":id" element={<ShowAuthor />} />
              </Route>
              <Route path="/summary" element={<SummaryPage />} />
            </Route>
          </Routes>
          <div id="toasts"/>
        </CssBaseline>
      </LocalizationProvider>
    </div>
  );
}

export default App;
