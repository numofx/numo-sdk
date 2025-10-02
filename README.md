# YieldSpace SDK

TypeScript SDK for interacting with YieldSpace AMM pools on Celo. Provides TypeScript types, ABIs, and deployment addresses for Pool and PoolNonTv contracts.

## Installation

```bash
npm install yieldspace-sdk ethers
```

## Features

- ✅ Full TypeScript support with auto-generated types
- ✅ Ethers v6 compatible contract factories
- ✅ Deployment addresses for all chains
- ✅ Type-safe contract interactions
- ✅ Works with React, Next.js, wagmi, and more

## Quick Start

### Basic Usage with Ethers

```typescript
import { ethers } from 'ethers';
import { PoolNonTv__factory, celoDeployments } from 'yieldspace-sdk';

// Connect to Celo
const provider = new ethers.JsonRpcProvider('https://forno.celo.org');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

// Get pool address
const poolAddress = celoDeployments.contracts.PoolNonTv_cKES.address;

// Create typed contract instance
const pool = PoolNonTv__factory.connect(poolAddress, wallet);

// Read contract state (fully typed!)
const [sharesCached, fyTokenCached] = await pool.getCache();
const baseToken = await pool.baseToken();
const fyToken = await pool.fyToken();

console.log('Pool reserves:', {
  shares: sharesCached.toString(),
  fyToken: fyTokenCached.toString()
});

// Execute transactions
const tx = await pool.mint(
  receiverAddress,
  receiverAddress,
  minRatio,
  maxRatio
);
await tx.wait();
console.log('Minted LP tokens!');
```

### With React + wagmi

```typescript
import { useContractRead, useContractWrite } from 'wagmi';
import { PoolNonTv__factory, celoDeployments } from 'yieldspace-sdk';

function PoolDashboard() {
  const poolAddress = celoDeployments.contracts.PoolNonTv_cKES.address;
  const poolABI = PoolNonTv__factory.abi;

  // Read pool state
  const { data: cache } = useContractRead({
    address: poolAddress,
    abi: poolABI,
    functionName: 'getCache',
  });

  const { data: baseToken } = useContractRead({
    address: poolAddress,
    abi: poolABI,
    functionName: 'baseToken',
  });

  // Write to contract
  const { write: mint, isLoading } = useContractWrite({
    address: poolAddress,
    abi: poolABI,
    functionName: 'mint',
  });

  return (
    <div>
      <h2>Pool Info</h2>
      <p>Shares: {cache?.[0]?.toString()}</p>
      <p>FY Tokens: {cache?.[1]?.toString()}</p>
      <p>Base Token: {baseToken}</p>

      <button
        onClick={() => mint({
          args: [receiverAddr, receiverAddr, 0, 0]
        })}
        disabled={isLoading}
      >
        {isLoading ? 'Minting...' : 'Mint LP Tokens'}
      </button>
    </div>
  );
}
```

### Helper Functions

```typescript
import { getPoolAddress } from 'yieldspace-sdk';

// Get pool address by name
const cKESPoolAddress = getPoolAddress('celo', 'PoolNonTv_cKES');
const usdtPoolAddress = getPoolAddress('celo', 'PoolNonTv_USDT');
```

### Using Raw ABIs (for other libraries)

```typescript
import poolNonTvABI from 'yieldspace-sdk/abis/PoolNonTv.json';
import celoDeployments from 'yieldspace-sdk/deployments/celo.json';

// Use with viem, web3.js, or any other library
const contract = new web3.eth.Contract(
  poolNonTvABI,
  celoDeployments.contracts.PoolNonTv_cKES.address
);
```

## Deployed Contracts

### Celo Mainnet (Chain ID: 42220)

| Pool Name | Address | Base Token | FY Token | Fee |
|-----------|---------|------------|----------|-----|
| PoolNonTv_cKES | `0xd398b65957B50F719b698e670f51F5cd4D77dbf4` | cKES | fycKES | 0.20% |
| PoolNonTv_USDT | `0xE34Ad943bCbb864B46369D7210827939F26A324b` | USDT | fyUSDT | 0.20% |

**Pool Parameters:**
- Time Stretch (ts): 2,339,826,654,429 (3-month tenor)
- g1Fee: 20 basis points (0.20%)

## API Reference

### Contract Factories

- `Pool__factory` - Factory for ERC4626 vault-based pools
- `PoolNonTv__factory` - Factory for non-tokenized vault pools

### Deployments

- `celoDeployments` - All deployed contracts on Celo mainnet

### Types

All contract types are fully typed with TypeScript. Your IDE will provide autocomplete for:
- Contract methods
- Event types
- Function parameters
- Return types

## Development

### Build from source

```bash
git clone https://github.com/yourusername/yieldspace-sdk.git
cd yieldspace-sdk
npm install
npm run build
```

### Scripts

- `npm run build` - Generate types and compile TypeScript
- `npm run typechain` - Generate TypeScript types from ABIs
- `npm run clean` - Remove generated files

## Package Contents

```
yieldspace-sdk/
├── dist/              # Compiled TypeScript (published)
├── abis/              # Contract ABIs (published)
├── deployments/       # Deployment addresses (published)
└── src/
    ├── types/         # Generated TypeChain types
    └── index.ts       # Main exports
```

## License

MIT

## Links

- [YieldSpace Contracts](https://github.com/yieldprotocol/yieldspace-tv)
- [Yield Protocol](https://yieldprotocol.com)
- [Documentation](https://docs.yieldprotocol.com)

## Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/yourusername/yieldspace-sdk/issues)
- Join the [Yield Protocol Discord](https://discord.gg/yieldprotocol)
