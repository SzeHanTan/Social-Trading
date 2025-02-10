import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import StrategyPopup from "../components/StrategyPopup";
import "../styles/Trade.css";

const socket = io("http://localhost:5000");

const strategies = [
  { id: 1, name: "Strategy 1", provider: "Provider A", performance: "10%", risk: "Low" },
  { id: 2, name: "Strategy 2", provider: "Provider B", performance: "15%", risk: "Medium" },
  { id: 3, name: "Strategy 3", provider: "Provider C", performance: "20%", risk: "High" },
];

const Trade = () => {
  const [amount, setAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("Select Asset");
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [copiedStrategies, setCopiedStrategies] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/market").then((response) => {
      setPrice(response.data.lastPrice);
    });

    socket.on("marketUpdate", (data) => {
      setPrice(data.lastPrice);
      setMarketData((prev) => [...prev, { time: new Date().toLocaleTimeString(), price: data.lastPrice }]);
    });

    return () => socket.disconnect();
  }, []);

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const selectAsset = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(false);
  };

  const selectStrategy = (strategy) => {
    setSelectedStrategy(strategy);
  };

  const handleCopyTrade = (strategyId) => {
    setCopiedStrategies([...copiedStrategies, strategyId]);
    setSelectedStrategy(null);
  };

  return (
    <div className="trade-container">
      <div className="left-section">
        <h2>Copy Trading Strategies</h2>
        <ul>
          {strategies.map((strategy) => (
            <li
              key={strategy.id}
              onClick={() => selectStrategy(strategy)}
              className={copiedStrategies.includes(strategy.id) ? "copied" : ""}
            >
              {strategy.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-section">
        <div className="top-buttons">
          <button className="demo-button">Demo</button>
          <button className="trade-button">Trade</button>
        </div>
        <div className="asset-button">
          <button onClick={toggleModal}>{selectedAsset}</button>
        </div>
        <div className="graph">
          <h2>BTC/USDT: ${price}</h2>
          <LineChart width={600} height={300} data={marketData}>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="bottom-buttons">
          <div className="amount-control">
            <button onClick={decreaseAmount} className="amount-button">
              -
            </button>
            <input type="number" value={amount} readOnly />
            <button onClick={increaseAmount} className="amount-button">
              +
            </button>
          </div>
          <button className="buy-button">Buy</button>
          <button className="sell-button">Sell</button>
        </div>
      </div>
      <div className="right-section">
        <h2>Real-Time Performance</h2>
        <div className="performance-graph">
          <h3>Performance Graph</h3>
          <p>Graph representation of real-time performance will be displayed here.</p>
        </div>
        <div className="performance-stats">
          <h3>Performance Stats</h3>
          <p>Percentage of earned and loss will be displayed here.</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Asset</h2>
            <ul>
              <li onClick={() => selectAsset("Asset 1")}>Asset 1</li>
              <li onClick={() => selectAsset("Asset 2")}>Asset 2</li>
              <li onClick={() => selectAsset("Asset 3")}>Asset 3</li>
            </ul>
            <button onClick={toggleModal} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}

      {selectedStrategy && (
        <StrategyPopup
          strategy={selectedStrategy}
          onClose={() => setSelectedStrategy(null)}
          onCopyTrade={handleCopyTrade}
        />
      )}
    </div>
  );
};

export default Trade;