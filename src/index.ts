// Export TypeChain generated types
export * from './types';

// Export deployment addresses
export { default as celoDeployments } from '../deployments/celo.json';

// Re-export commonly used types and factories
export type { Pool, PoolNonTv } from './types';
export { Pool__factory, PoolNonTv__factory } from './types';

// Deployment helper types
export interface Deployment {
  address: string;
  baseToken: string;
  fyToken: string;
  maturity: number;
  g1Fee: number;
}

export interface ChainDeployments {
  chainId: number;
  name: string;
  contracts: {
    [key: string]: Deployment;
  };
}

// Helper function to get contract address
export function getPoolAddress(
  chain: 'celo',
  poolName: 'PoolNonTv_cKES' | 'PoolNonTv_USDT'
): string {
  const deployments = require(`../deployments/${chain}.json`);
  return deployments.contracts[poolName].address;
}
