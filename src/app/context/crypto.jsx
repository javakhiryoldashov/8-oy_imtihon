import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [caruselData, setCaruselData] = useState([]);
  const [current, setCurrent] = useState("₹");
  const [searchTerm, setSearchTerm] = useState("");
  const [watchList, setWatchList] = useState([]);
  const [openWatchList, setOpenWatchList] = useState(false);
  const [singleCrypto, setSingleCrypto] = useState({});
  const [cryptoData, setCryptoData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=249&page=1&sparkline=false&price_change_percentage=24h"
      );
      const result = await response.json();
      setData(result);
      setCaruselData(result);
      setOriginalData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrent(e.target.value);
  };

  useEffect(() => {
    const storedWatchList = localStorage.getItem("watchList");
    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }
  }, []);

  const getPriceTrunk = (price) => {
    const parts = price.toString().split(".");
    if (parts.length === 1) {
      return price >= 0 ? "+" + price : price;
    } else {
      const truncated = parseFloat(parts[0] + "." + parts[1].slice(0, 2));
      return truncated >= 0 ? "+" + truncated : truncated;
    }
  };

  const convertCurrency = (price, rate) => {
    const convertedPrice = price * rate;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  const NumberToMillions = (num) => {
    const numStr = num.toString();
    const numLength = numStr.length;
    let result = "";

    for (let i = 0; i < numLength; i++) {
      result = numStr.charAt(numLength - 1 - i) + result;
      if ((i + 1) % 3 === 0 && i !== numLength - 1) {
        result = "," + result;
      }
    }

    return result + "M";
  };

  const convertMarketCup = (marketCap, rate) => {
    return (marketCap * rate).toFixed(2);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setData(originalData); // Reset to original data if search term is empty
    } else {
      const filteredData = originalData.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const addToWatchList = (crypto) => {
    const storedWatchList = localStorage.getItem("watchList");
    const watchList = storedWatchList ? JSON.parse(storedWatchList) : [];

    if (!watchList.some((item) => item.id === crypto.id)) {
      const updatedWatchList = [...watchList, crypto];

      setWatchList(updatedWatchList);
      localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    }
  };

  const removeFromWatchList = (cryptoId) => {
    const updatedWatchList = watchList.filter(
      (crypto) => crypto.id !== cryptoId
    );
    setWatchList(updatedWatchList);
    localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
  };

  const handleOpenWatchList = () => {
    setOpenWatchList(!openWatchList);
    console.log(openWatchList);
  };

  const fetchCryptoData = async (id) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
      );
      const data = await response.json();
      setCryptoData(data.prices);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  const getCryptoById = async (id) => {
    fetchCryptoData(id);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const result = await response.json();
      setSingleCrypto(result);
      navigate(`/crypto/${id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const trunkDescription = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  };

  return (
    <CryptoContext.Provider
      value={{
        data,
        fetchData,
        current,
        getPriceTrunk,
        convertCurrency,
        NumberToMillions,
        convertMarketCup,
        handleCurrencyChange,
        handleSearch,
        searchTerm,
        addToWatchList,
        watchList,
        caruselData,
        openWatchList,
        handleOpenWatchList,
        removeFromWatchList,
        getCryptoById,
        singleCrypto,
        trunkDescription,
        cryptoData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  return useContext(CryptoContext);
};
