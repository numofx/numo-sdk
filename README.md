# Numo SDK

SDK for interacting with Numo rate markets on Celo. Provides typeScript types, ABIs, and deployment addresses for `PoolNonTv` and `Ladle`.

## Installation

```bash
bun install numo-sdk
```

## Quick Start

### Basic Usage with Ethers

```typescript
import { ethers } from 'ethers';
import { PoolNonTv__factory, celoDeployments } from 'numo-sdk';
import { Ladle__factory, celoDeployments } from 'numo-sdk';

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
