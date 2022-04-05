import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import Safety from './components/Safety';
import About from './components/About';
import Contact from './components/Contact';
import Explore from './components/Explore';
import Create from './components/Create';
import Messages from './components/Messages';
import Bids from './components/Bids';
import Dates from './components/Dates';
import Payment from './components/Payment';
import Message from './components/Message';
import Listing from './components/Listing';
import Offer from './components/Offer';
import Confirm from './components/Confirm';
import Profile from './components/Profile';
import Update from './components/Update';
import './css/App.css';

import ROUTE from './configurations/route-frontend-config.js';
import { isAuth } from './axios/credentials.js';

function App() {
	useEffect(async () => {
		console.log('local', window.location.pathname);
		const isLoggedIn = await isAuth();

		console.log('logged', isLoggedIn);

		const pathname = window.location.pathname;
		if (
			(pathname.localeCompare(ROUTE.HOME) == 0 ||
				pathname.localeCompare(ROUTE.SIGNUP) == 0 ||
				pathname.localeCompare(ROUTE.LOGIN) == 0) &&
			isLoggedIn
		) {
			window.location = ROUTE.EXPLORE;
		} else if (
			!(
				pathname.localeCompare(ROUTE.HOME) == 0 ||
				pathname.localeCompare(ROUTE.SIGNUP) == 0 ||
				pathname.localeCompare(ROUTE.LOGIN) == 0
			) &&
			!isLoggedIn
		) {
			window.location = ROUTE.LOGIN;
		}
	}, []);

	return (
		<React.Fragment>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route exact path={ROUTE.HOME} element={<Homepage />} />
					<Route exact path={ROUTE.SIGNUP} element={<Signup />} />
					<Route exact path={ROUTE.LOGIN} element={<Login />} />
					<Route exact path={ROUTE.SAFETY} element={<Safety />} />
					<Route exact path={ROUTE.ABOUT} element={<About />} />
					<Route exact path={ROUTE.CONTACT} element={<Contact />} />
					<Route exact path={ROUTE.EXPLORE} element={<Explore />} />
					<Route exact path={ROUTE.CREATE} element={<Create />} />
					<Route exact path={ROUTE.MESSAGES} element={<Messages />} />
					<Route exact path={ROUTE.MYBIDS} element={<Bids />} />
					<Route exact path={ROUTE.MYDATES} element={<Dates />} />
					<Route exact path={ROUTE.PAYMENT} element={<Payment />} />
					<Route exact path={ROUTE.MESSAGE} element={<Message />} />
					<Route
						exact
						path={ROUTE.LISTING}
						element={<Listing role={'engager'} status={'ongoing'} />}
						// element={<Listing role={'creator'} status={'ongoing'} />}
						// element={<Listing role={'observer'} />}
					/>
					<Route exact path={ROUTE.OFFER} element={<Offer />} />
					<Route exact path={ROUTE.CONFIRM} element={<Confirm />} />
					<Route exact path={ROUTE.PROFILE} element={<Profile role={'creator'} />} />
					<Route exact path={ROUTE.UPDATE} element={<Update />} />
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;
