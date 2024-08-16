import React from 'react';
import { Link } from 'react-router-dom';
import { useCrypto } from '../../app/context/crypto';
import '../../styles/header.css';

function Header() {
	const {
		current,
		handleCurrencyChange,
		handleOpenWatchList,
		openWatchList,
		convertCurrency,
		watchList,
		removeFromWatchList,
		getCryptoById,
	} = useCrypto();

	// eslint-disable-next-line
	const handleCryptoClick = id => {
		getCryptoById(id);
	};

	return (
		<div>
			<div className='w-full fixed top-0 bacgraund'>
				<div className='w-[1230px] h-[64px] flex mx-auto justify-between items-center'>
					<div className='logo'>
						<Link to={'/'}>
							<h2 className='title'>CRYPTOFOLIO</h2>
						</Link>
					</div>
					<div className='flex items-center'>
						<div className='current_price'>
							<select className='bacgraund mr-3' value={current} onChange={handleCurrencyChange}>
								<option value='₹'>INR</option>
								<option value='$'>USD</option>
								<option value='€'>EUR</option>
							</select>
						</div>
						<div className='watchlist_btn'>
							<button
								className='bg-blue-300 py-2 px-5 rounded-md text-black'
								onClick={() => handleOpenWatchList()}
							>
								Watchlist
							</button>
						</div>
					</div>
				</div>
			</div>
			{openWatchList && (
				<div className='w-[470px] h-[700px] pb-20 bg_watch fixed right-0 z-10 flex flex-col'>
					<h2 className='text-[30px] text-center my-[20px]'>Watch List</h2>
					<div className='flex flex-wrap items-center justify-center gap-[25px] overflow-y-scroll no-scrollbar'>
						{watchList && watchList.length > 0 ? (
							watchList.map(crypto => (
								<div key={crypto.id}>
									<div className='card w-[200px] h-[310px] flex flex-col mb-[20px] items-center bg-gray-950 rounded-[25px]'>
										<img className='w-[118px] h-[118px] mt-[17px]' src={crypto.image} alt='' />
										<p className='text-[20px] mt-[35px] font-bold'>{crypto.name}</p>
										<p className='text-[20px]'>{crypto.symbol.toUpperCase()}</p>
										<p className='text-[14px]'>{convertCurrency(crypto.current_price, 1)}</p>
										<button
											className='bg-red-600 py-2 px-5 mt-[10px] rounded-md text-white '
											onClick={() => removeFromWatchList(crypto.id)}
										>
											Remove
										</button>
									</div>
								</div>
							))
						) : (
							<p>No items in your watchlist.</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Header;
