# ATV On-Chain Oracle

A chain-agnostic on-chain oracle contract that calculates the Net Asset Value (NAV) for ATV vault tokens. This oracle implements Chainlink's `AggregatorV3Interface` for seamless integration with DeFi protocols like Morpho Blue, lending platforms, and other systems requiring reliable price feeds.

## 🌟 Features

- **Chain-Agnostic**: Works on any EVM-compatible blockchain (Ethereum, Sonic, Polygon, etc.)
- **On-Chain Calculation**: Computes NAV directly from blockchain data without external dependencies
- **Chainlink Compatible**: Implements `AggregatorV3Interface` for drop-in compatibility
- **Self-Contained**: No external imports required - all interfaces included in the contract
- **Fallback Logic**: Handles edge cases like zero total supply gracefully
- **Owner-Controlled**: Price updates restricted to contract owner (extensible to automation)
- **Event Logging**: Emits `PriceUpdated` events for off-chain monitoring

## 🏗 Architecture

The oracle calculates vault token price using this formula:
```
rawPrice = (poolValueInUSD * 10000) / totalSupply
finalPrice = rawPrice * 1e4  // Scaled to 8 decimals for Chainlink compatibility
```

If `totalSupply` is zero, it defaults to `1,000,000` (representing $1.00 at 4 decimal precision).

## 📋 Prerequisites

- Node.js v20+ (v18.19.1+ supported with warnings)
- Hardhat development environment
- Access to an RPC endpoint for your target blockchain

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone 
cd atv-onchain-oracle
npm install
```

### 2. Configure for Your Blockchain

#### Update RPC URL
Edit `hardhat.config.js`:
```javascript
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: "https://your-chain-rpc-url",  // Change this to your chain's RPC
        blockNumber: 12345678  // Optional: specific block for caching
      }
    }
  },
  mocha: {
    timeout: 200000  // 200 seconds for network calls
  }
};
```

#### Update Contract Addresses
Edit `test/atvOracle.test.js`:
```javascript
// Replace with your chain's vault addresses
const ATV_BASE = "0xYourBaseTokenAddress";     // Vault token contract
const ATV_STORAGE = "0xYourStorageAddress";    // Storage contract with calculatePoolInUsd
```

### 3. Compile and Test
```bash
npx hardhat compile
npx hardhat test
```

### 4. Deploy
```bash
npx hardhat run scripts/deploy.js --network hardhat
```

## 🔧 Usage

### Calculate and Store Price
```solidity
// Call this function to update the oracle price
oracle.calculateAndStorePrice(baseTokenAddress, storageAddress);
```

### Query Latest Price
```solidity
// Get the latest price data (Chainlink compatible)
(uint80 roundId, int256 price, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) = oracle.latestRoundData();
```

### Integration with DeFi Protocols
The oracle can be used directly with any protocol expecting a Chainlink price feed:
```solidity
AggregatorV3Interface priceFeed = AggregatorV3Interface(oracleAddress);
(, int256 price,,,) = priceFeed.latestRoundData();
```

## 📁 Project Structure

```
atv-onchain-oracle/
├── contracts/
│   └── AtvOnChainOracle.sol      # Main oracle contract (self-contained)
├── test/
│   └── atvOracle.test.js         # Comprehensive test suite
├── scripts/
│   └── deploy.js                 # Deployment script
├── hardhat.config.js             # Hardhat configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🌐 Multi-Chain Support

### Supported Networks
- Ethereum Mainnet/Testnets
- Sonic Chain
- Polygon
- Any EVM-compatible blockchain

### Network Configuration Examples

#### Ethereum Mainnet
```javascript
url: "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY"
```

#### Sonic Testnet
```javascript
url: "https://sonic-testnet-rpc.example.com"
```

#### Polygon
```javascript
url: "https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY"
```

## 🧪 Testing

The test suite includes:
- Deployment verification
- Address validation
- Price calculation accuracy
- Event emission checks
- Access control testing
- Gas estimation

Run tests with:
```bash
npx hardhat test
```

For verbose output with all values:
```bash
npx hardhat test --verbose
```

## 🔐 Security Considerations

- **Owner Control**: Only the contract owner can update prices
- **Address Validation**: Prevents zero address attacks
- **Fallback Logic**: Handles edge cases gracefully
- **Event Logging**: All price updates are logged for transparency

## 🚀 Production Deployment

### 1. Set Up Chainlink Automation (Recommended)
For automated price updates, integrate with Chainlink Upkeep:
- Register your oracle with Chainlink Automation
- Fund with LINK tokens
- Configure update frequency

### 2. Deploy to Mainnet
```bash
# Add mainnet config to hardhat.config.js first
npx hardhat run scripts/deploy.js --network mainnet
```

### 3. Verify Contract
```bash
npx hardhat verify --network mainnet DEPLOYED_ADDRESS
```

## 🤝 Integration with Morpho Blue

This oracle is designed for use with Morpho Blue lending markets:

1. Deploy the oracle
2. Create a Morpho market using your oracle address
3. Set appropriate LTV ratios
4. Enable borrowing/lending

## 📊 Gas Optimization

- Deployment: ~786K gas
- Price Update: ~82K gas
- Query (view): Free

## 🛠 Development

### Adding New Features
The contract is designed to be extensible. Common additions:
- Multi-asset support
- Time-weighted averages
- Additional access controls
- Custom scaling factors

### Testing on Different Chains
Simply update the RPC URL and addresses - no code changes needed.

**Note**: This oracle is designed for non-publicly traded vault tokens. For publicly traded assets, consider using existing Chainlink price feeds.
