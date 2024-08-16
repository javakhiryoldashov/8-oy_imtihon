import { useContext } from 'react';
import ApexChart from '../../components/apex-chart';
import '../../styles/cryptoPage.css';
import { CryptoContext } from '../context/crypto';

const SingleCryptoPage = () => {
	const {
		singleCrypto,
		trunkDescription,
		convertCurrency,
		current,
		NumberToMillions,
		convertMarketCup,
		cryptoData,
	} = useContext(CryptoContext);

	// Check if singleCrypto exists before trying to access its properties
	if (!singleCrypto || !singleCrypto.market_data) {
		return <div>Loading...</div>; // or any loading spinner/placeholder you prefer
	}

	return (
		<div className='mt-[64px] flex'>
			<div className='bg w-[550px] h-[665px] flex flex-col items-center px-5'>
				<img
					className='w-[200px] h-[200px] mt-[25px]'
					src={singleCrypto.image?.large}
					alt={singleCrypto.name}
				/>
				<div>
					<h3 className='text-white text-center s_title'>{singleCrypto.name}</h3>
					<p className='py-5 text-[16px] font-normal'>
						{singleCrypto.description?.en
							? trunkDescription(singleCrypto.description.en, 250)
							: 'No description available.'}
					</p>
					<p className='rank'>
						<span className='text-[24px] text-start'>Rank: </span>
						<span className='text-w-[24px]'> {singleCrypto.market_cap_rank}</span>
					</p>
					<div className='current_price text-[14px] text-white'>
						<span className='text-[24px] '> Current Price:</span>
						{current === '₹'
							? ` ${current} ${convertCurrency(singleCrypto.market_data.current_price.usd, 1)} `
							: current === '$'
							? ` ${current} ${convertCurrency(singleCrypto.market_data.current_price.usd, 0.012)} `
							: ` ${current} ${convertCurrency(
									singleCrypto.market_data.current_price.usd,
									0.0111
							  )}`}
					</div>
					<div className='market_cap'>
						<span className='text-[24px]'> Market Cap:</span>
						{current === '₹'
							? `${current} ${NumberToMillions(singleCrypto.market_data.market_cap.usd, 1)} `
							: current === '$'
							? `${current} ${NumberToMillions(
									convertMarketCup(singleCrypto.market_data.market_cap.usd, 0.012)
							  )} `
							: ` ${current} ${NumberToMillions(
									convertMarketCup(singleCrypto.market_data.market_cap.usd, 0.0111)
							  )}`}
					</div>
				</div>
			</div>
			<div className='line flex items-center mt-[30px] w-[3px] h-[600px] bg-gray-600 '></div>
			<div className='apex-chart w-full'>
				<ApexChart data={cryptoData} />
			</div>
		</div>
	);
};

export default SingleCryptoPage;
