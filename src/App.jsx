import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SingleCryptoPage from './app/crypto';
import Home from './app/page';
import Header from './components/header';

const App = () => {
	return (
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/crypto/:id' element={<SingleCryptoPage />} />
			</Routes>
		</>
	);
};

export default App;
