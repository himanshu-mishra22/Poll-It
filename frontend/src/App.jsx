import {BrowserRouter, Routes, Route, Navigate} from 'react-router'
import LoginPage from './pages/auth/LoginPage.jsx'
import SignUpPage from './pages/auth/SignUpPage.jsx'
import HomePage from './pages/dashboard/HomePage.jsx'
import CreatePollPage from './pages/dashboard/CreatePollPage.jsx'
import MyPollsPage from './pages/dashboard/MyPollsPage.jsx'
import BookmarkedPages from './pages/dashboard/BookmarkedPages.jsx'
import './App.css'
import VotedPage from './pages/dashboard/VotedPage'
import UserProvider from './context/UserContext.jsx'
import { Toaster } from 'react-hot-toast';


function App() {

  return (
   <div>
    <UserProvider>
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/signup" exact element={<SignUpPage />} />
        <Route path="/dashboard" exact element={<HomePage />} />
        <Route path="/create-poll" exact element={<CreatePollPage />} />
        <Route path="/my-polls" exact element={<MyPollsPage />} />
        <Route path="/voted-polls" exact element={<VotedPage />} /> 
        <Route path="/bookmarks" exact element={<BookmarkedPages />} /> 
      </Routes>
    </BrowserRouter>
    </UserProvider>
   </div>
  )
}

export default App


//define the root component to handle initial redirect
const Root = ()=>{
  //chk for authentication--> if exist in local storage, redirect to dashboard
  const isAuthenticated = localStorage.getItem('token');


  //redirect to login of not authenticated
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}
