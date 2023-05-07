import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Userlist from "./Components/Userlist";
import Adduser from "./Components/Adduser";
import Updateuser from "./Components/Updateuser";
import { Provider } from "react-redux";
import Store from './Redux/Store'

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <div className="container my-4">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Userlist></Userlist>}></Route>
              <Route path='/add' element={<Adduser></Adduser>}></Route>
              <Route path='/edit/:id' element={<Updateuser></Updateuser>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
        <ToastContainer className='toast-position' position="bottom-right"></ToastContainer>
      </div>
    </Provider>
  );
}

export default App;
