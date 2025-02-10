import React, { useState } from 'react';
import '../styles/StrategyPopup.css';

const StrategyPopup = ({ strategy, onClose, onCopyTrade }) => {
  const [funds, setFunds] = useState('');

  const handleCopyTrade = () => {
    onCopyTrade(strategy.id);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Strategy Details</h2>
        <p><strong>Provider:</strong> {strategy.provider}</p>
        <p><strong>Performance:</strong> {strategy.performance}</p>
        <p><strong>Risk:</strong> {strategy.risk}</p>
        <div className="funds-allocation">
          <label>Allocate Funds:</label>
          <input
            type="number"
            value={funds}
            onChange={(e) => setFunds(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <button onClick={handleCopyTrade} className="copy-trade-button">Copy Trade</button>
        <button onClick={onClose} className="close-modal">Close</button>
      </div>
    </div>
  );
};

export default StrategyPopup;