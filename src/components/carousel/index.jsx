import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { CryptoContext } from '../../app/context/crypto';
import '../../styles/carousel.css';

function Carusel() {
	const { caruselData, current, convertCurrency, getPriceTrunk, getCryptoById } =
		useContext(CryptoContext);

	const settings = {
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		autoplay: true,
		autoplaySpeed: 2300,
	};

	const handleCryptoClick = cryptoId => {
		getCryptoById(cryptoId);
	};

	return (
		<div>
			<div
				className='text-white mt-[64px] h-[400px]'
				style={{ backgroundImage: `url("/bghero.png")` }}
			>
				<div className='w-[1230px] mx-auto'>
					<div className='text-center'>
						<h1 className='title_carusel'>CRYPTOFOLIO WATCH LIST</h1>
						<p className='lorem_carusel'>
							Get all the Info regarding your favorite Crypto Currency
						</p>
					</div>
				</div>
				<div className=''>
					<div className='slider-container w-[1230px] mx-auto'>
						<Slider {...settings}>
							{caruselData.map(crypto => (
								<div key={crypto.id} onClick={() => handleCryptoClick(crypto.id)}>
									<div className='carousel-item flex flex-col items-center mt-9 cursor-pointer'>
										<img
											src={crypto.image}
											alt={crypto.name}
											className='w-full h-[150px] object-cover rounded-md'
										/>
										<div>
											<h3 className='mt-4 text-lg font-bold items-center'>
												{crypto.symbol.toUpperCase()}{' '}
												<span
													className={
														crypto.price_change_percentage_24h > 0
															? 'text-green-600 text-[14px]'
															: 'text-red-600 text-[14px]'
													}
												>
													{crypto.price_change_percentage_24h > 0
														? getPriceTrunk(`+` + crypto.price_change_percentage_24h)
														: getPriceTrunk(crypto.price_change_percentage_24h)}
													%
												</span>
											</h3>
											<p className='text-[21px] text-center text-white'>
												{current === '₹'
													? `${current} ${convertCurrency(crypto.current_price, 1)} `
													: current === '$'
													? `${current} ${convertCurrency(crypto.current_price, 0.012)} `
													: ` ${current} ${convertCurrency(crypto.current_price, 0.0111)}`}
											</p>
										</div>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Carusel;
