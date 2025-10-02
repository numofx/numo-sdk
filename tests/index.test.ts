import {
  celoDeployments,
  getPoolAddress,
  Pool__factory,
  PoolNonTv__factory,
} from '../src/index';

describe('YieldSpace SDK', () => {
  describe('Deployments', () => {
    it('should export celoDeployments', () => {
      expect(celoDeployments).toBeDefined();
      expect(celoDeployments.chainId).toBe(42220);
      expect(celoDeployments.name).toBe('Celo Mainnet');
    });

    it('should have PoolNonTv_cKES contract', () => {
      expect(celoDeployments.contracts.PoolNonTv_cKES).toBeDefined();
      expect(celoDeployments.contracts.PoolNonTv_cKES.address).toBe(
        '0xd398b65957B50F719b698e670f51F5cd4D77dbf4'
      );
    });

    it('should have PoolNonTv_USDT contract', () => {
      expect(celoDeployments.contracts.PoolNonTv_USDT).toBeDefined();
      expect(celoDeployments.contracts.PoolNonTv_USDT.address).toBe(
        '0xE34Ad943bCbb864B46369D7210827939F26A324b'
      );
    });

    it('should have correct pool configurations', () => {
      const cKESPool = celoDeployments.contracts.PoolNonTv_cKES;
      expect(cKESPool.baseToken).toBeDefined();
      expect(cKESPool.fyToken).toBeDefined();
      expect(cKESPool.maturity).toBeDefined();
      expect(cKESPool.g1Fee).toBe(20);

      const usdtPool = celoDeployments.contracts.PoolNonTv_USDT;
      expect(usdtPool.baseToken).toBeDefined();
      expect(usdtPool.fyToken).toBeDefined();
      expect(usdtPool.maturity).toBeDefined();
      expect(usdtPool.g1Fee).toBe(20);
    });
  });

  describe('Helper Functions', () => {
    it('getPoolAddress should return correct address for cKES pool', () => {
      const address = getPoolAddress('celo', 'PoolNonTv_cKES');
      expect(address).toBe('0xd398b65957B50F719b698e670f51F5cd4D77dbf4');
    });

    it('getPoolAddress should return correct address for USDT pool', () => {
      const address = getPoolAddress('celo', 'PoolNonTv_USDT');
      expect(address).toBe('0xE34Ad943bCbb864B46369D7210827939F26A324b');
    });
  });

  describe('Contract Factories', () => {
    it('should export Pool__factory', () => {
      expect(Pool__factory).toBeDefined();
      expect(typeof Pool__factory.connect).toBe('function');
      expect(typeof Pool__factory.createInterface).toBe('function');
    });

    it('should export PoolNonTv__factory', () => {
      expect(PoolNonTv__factory).toBeDefined();
      expect(typeof PoolNonTv__factory.connect).toBe('function');
      expect(typeof PoolNonTv__factory.createInterface).toBe('function');
    });

    it('Pool__factory should have valid ABI', () => {
      expect(Array.isArray(Pool__factory.abi)).toBe(true);
      expect(Pool__factory.abi.length).toBeGreaterThan(0);
    });

    it('PoolNonTv__factory should have valid ABI', () => {
      expect(Array.isArray(PoolNonTv__factory.abi)).toBe(true);
      expect(PoolNonTv__factory.abi.length).toBeGreaterThan(0);
    });
  });
});
