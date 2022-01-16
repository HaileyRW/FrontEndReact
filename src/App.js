import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import AnnualReport from './pages/annual';
import Teams from './pages/team';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';

function App() {
	const CLIENT_ID = "0070528f518f4c4f8d33b5c12a15e309"
	const REDIRECT_URI = "http://localhost:8080"
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
	const RESPONSE_TYPE = "token"
	const [token, setToken] = useState("")

	useEffect(() => {
		const hash = window.location.hash
		let token = window.localStorage.getItem("token")

		if (!token && hash) {
			token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

			window.location.hash = ""
			window.localStorage.setItem("token", token)
		}

		setToken(token)

	}, [])
	const logout = () => {
		setToken("")
		window.localStorage.removeItem("token")
	}

	return (
		<><BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' exact element={<Home />} />
				<Route path='/about' element={<About />} />
				{/* <Route path='/events' element={<Events />} /> */}
				{/* <Route path='/annual' element={<AnnualReport />} /> */}
				{/* <Route path='/team' element={<Teams />} /> */}
				{/* <Route path='/blogs' element={<Blogs />} /> */}
				<Route path='/sign-up' element={<SignUp />} />
			</Routes>
		</BrowserRouter>
			<div className="App">
				<header className="App-header">
					<h1>Spotify React</h1>
					{!token ?
						<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
							to Spotify</a>
						: <button onClick={logout}>Logout</button>}
				</header>
			</div></>
	);
}

export default App;

