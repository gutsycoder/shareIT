import './App.css';
import Post  from './Post';
import Header from './Header';
import {Route, Routes} from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route index element={
          <main>
            <Header />
            <Post />
            <Post />
            <Post />
        </main>

      } />
      <Route path={'/login'} element={
        <div>Login Page</div>
      }></Route>
      <Route path={'/register'} element={
        <div>Register Page</div>
      }></Route>
    </Routes>
  )
  
}

export default App;
