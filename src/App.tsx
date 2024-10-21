
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App"></div>
    // <BrowserRouter>
    //   <Routes>
    //       <Route path="/" element={<HomeTemplate Props={<Home/>}/>}/>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
