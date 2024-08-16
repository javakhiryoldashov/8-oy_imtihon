import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

import Carusel from "../components/carousel";
import "../styles/home.css";
import "../styles/pagination.css";
import { CryptoContext } from "./context/crypto";

function Home() {
  const {
    data,
    fetchData,
    current,
    getPriceTrunk,
    convertCurrency,
    NumberToMillions,
    convertMarketCup,
    handleSearch,
    searchTerm,
    addToWatchList,
    watchList,
    removeFromWatchList,
    getCryptoById,
  } = useContext(CryptoContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const handleCryptoClick = (cryptoId) => {
    getCryptoById(cryptoId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5;

    pageNumbers.push(
      <button
        key="prev"
        onClick={handlePrevPage}
        className={`pagination_button ${
          currentPage === 1 ? "pagination_button_disable" : ""
        }`}
      >
        {`<`}
      </button>
    );

    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`pagination_button ${currentPage === 1 ? "active" : ""}`}
      >
        1
      </button>
    );

    if (currentPage > visiblePages) {
      pageNumbers.push(<span key="start-ellipsis">...</span>);
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination_button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - (visiblePages - 1)) {
      pageNumbers.push(<span key="end-ellipsis">...</span>);
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`pagination_button ${
            currentPage === totalPages ? "active" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    pageNumbers.push(
      <button
        key="next"
        onClick={handleNextPage}
        className={`pagination_button ${
          currentPage === 10 ? "pagination_button_disable" : ""
        }`}
      >
        {`>`}
      </button>
    );

    return pageNumbers;
  };

  return (
    <div>
      <Carusel />
      <div className="main_bg">
        <div className="main">
          <h1 className="main_title">Cryptocurrency Prices by Market Cap</h1>
          <input
            className="search_crypto_input"
            type="text"
            placeholder="Search For a Crypto Currency.."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th className="w-[445px] text-start px-5 text-[14px] text-black">
                    Coin
                  </th>
                  <th className="w-[240px] text-right text-[14px] text-black">
                    Price
                  </th>
                  <th className="w-[258px] text-right text-[14px] text-black">
                    24h Change
                  </th>
                  <th className="w-[250px] text-right text-[14px] text-black">
                    Market Cap
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 &&
                  currentItems.map((crypto) => {
                    const isAdded = watchList.some(
                      (item) => item.id === crypto.id
                    );
                    return (
                      <tr
                        key={crypto.id}
                        className="tr py-[21px] cursor-pointer"
                      >
                        <td
                          className="w-[445px] text-start px-5 items-center"
                          onClick={() => handleCryptoClick(crypto.id)}
                        >
                          <div className="flex">
                            <img
                              className="w-[50px] h-[50px] inline-block mr-4"
                              src={crypto.image}
                              alt={crypto.name}
                            />
                            <div className="inline-block">
                              <div className="text-[20px] text-white">
                                {crypto.symbol.toUpperCase()}
                              </div>
                              <div className="text-[14px]">{crypto.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="w-[240px] text-right">
                          <p className="text-[14px] text-white">
                            {current === "₹"
                              ? `${current} ${convertCurrency(
                                  crypto.current_price,
                                  1
                                )} `
                              : current === "$"
                              ? `${current} ${convertCurrency(
                                  crypto.current_price,
                                  0.012
                                )} `
                              : ` ${current} ${convertCurrency(
                                  crypto.current_price,
                                  0.0111
                                )}`}
                          </p>
                        </td>
                        <td className="w-[258px] text-right flex justify-end">
                          <div className="flex justify-end items-center">
                            <div className="flex items-center mt-[10px]">
                              <div
                                className="w-[50px] flex justify-start mr-[5px]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  isAdded
                                    ? removeFromWatchList(crypto.id)
                                    : addToWatchList(crypto);
                                }}
                              >
                                <span
                                  className={`${
                                    isAdded
                                      ? "text-green-400 cursor-pointer"
                                      : "cursor-pointer"
                                  }`}
                                >
                                  <FaEye />
                                </span>
                              </div>
                              <div className="w-[50px]">
                                <p
                                  className={
                                    crypto.price_change_percentage_24h > 0
                                      ? "text-green-600 text-[14px]"
                                      : "text-red-600 text-[14px]"
                                  }
                                >
                                  {crypto.price_change_percentage_24h > 0
                                    ? getPriceTrunk(
                                        `+` + crypto.price_change_percentage_24h
                                      )
                                    : getPriceTrunk(
                                        crypto.price_change_percentage_24h
                                      )}
                                  %
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="w-[250px] text-right">
                          <p className="text-[14px] text-white">
                            {current === "₹"
                              ? `${current} ${NumberToMillions(
                                  crypto.market_cap
                                )} `
                              : current === "$"
                              ? `${current} ${NumberToMillions(
                                  convertMarketCup(crypto.market_cap, 0.012)
                                )} `
                              : ` ${current} ${NumberToMillions(
                                  convertMarketCup(crypto.market_cap, 0.0111)
                                )}`}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="pagination">{renderPageNumbers()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
