import { Pool__factory, PoolNonTv__factory } from '../src/types';
import type { Pool, PoolNonTv } from '../src/types';
import * as fs from 'fs';
import * as path from 'path';

describe('TypeChain Generated Types', () => {
  describe('Type Generation', () => {
    it('should have generated types directory', () => {
      const typesDir = path.join(__dirname, '../src/types');
      expect(fs.existsSync(typesDir)).toBe(true);
    });

    it('should have generated Pool types', () => {
      const poolFile = path.join(__dirname, '../src/types/Pool.ts');
      expect(fs.existsSync(poolFile)).toBe(true);
    });

    it('should have generated PoolNonTv types', () => {
      const poolNonTvFile = path.join(__dirname, '../src/types/PoolNonTv.ts');
      expect(fs.existsSync(poolNonTvFile)).toBe(true);
    });

    it('should have generated factories', () => {
      const factoriesDir = path.join(__dirname, '../src/types/factories');
      expect(fs.existsSync(factoriesDir)).toBe(true);
    });

    it('should have Pool__factory', () => {
      const poolFactoryFile = path.join(
        __dirname,
        '../src/types/factories/Pool__factory.ts'
      );
      expect(fs.existsSync(poolFactoryFile)).toBe(true);
    });

    it('should have PoolNonTv__factory', () => {
      const poolNonTvFactoryFile = path.join(
        __dirname,
        '../src/types/factories/PoolNonTv__factory.ts'
      );
      expect(fs.existsSync(poolNonTvFactoryFile)).toBe(true);
    });
  });

  describe('Factory Interfaces', () => {
    it('Pool__factory should have required static methods', () => {
      expect(Pool__factory.abi).toBeDefined();
      expect(typeof Pool__factory.connect).toBe('function');
      expect(typeof Pool__factory.createInterface).toBe('function');
    });

    it('PoolNonTv__factory should have required static methods', () => {
      expect(PoolNonTv__factory.abi).toBeDefined();
      expect(typeof PoolNonTv__factory.connect).toBe('function');
      expect(typeof PoolNonTv__factory.createInterface).toBe('function');
    });
  });

  describe('ABI Validation', () => {
    it('Pool ABI should have required functions', () => {
      const abi = Pool__factory.abi;
      const functionNames = abi
        .filter((item: any) => item.type === 'function')
        .map((item: any) => item.name);

      // Check for key YieldSpace pool functions
      expect(functionNames).toContain('mint');
      expect(functionNames).toContain('burn');
      expect(functionNames).toContain('getCache');
      expect(functionNames).toContain('baseToken');
      expect(functionNames).toContain('fyToken');
    });

    it('PoolNonTv ABI should have required functions', () => {
      const abi = PoolNonTv__factory.abi;
      const functionNames = abi
        .filter((item: any) => item.type === 'function')
        .map((item: any) => item.name);

      // Check for key YieldSpace pool functions
      expect(functionNames).toContain('mint');
      expect(functionNames).toContain('burn');
      expect(functionNames).toContain('getCache');
      expect(functionNames).toContain('baseToken');
      expect(functionNames).toContain('fyToken');
    });

    it('Pool ABI should have events', () => {
      const abi = Pool__factory.abi;
      const events = abi.filter((item: any) => item.type === 'event');
      expect(events.length).toBeGreaterThan(0);
    });

    it('PoolNonTv ABI should have events', () => {
      const abi = PoolNonTv__factory.abi;
      const events = abi.filter((item: any) => item.type === 'event');
      expect(events.length).toBeGreaterThan(0);
    });
  });

  describe('Type Exports', () => {
    it('should export Pool type', () => {
      // This is a compile-time check - if it compiles, the type exists
      const typeCheck: Pool = {} as Pool;
      expect(typeCheck).toBeDefined();
    });

    it('should export PoolNonTv type', () => {
      // This is a compile-time check - if it compiles, the type exists
      const typeCheck: PoolNonTv = {} as PoolNonTv;
      expect(typeCheck).toBeDefined();
    });
  });

  describe('Interface Creation', () => {
    it('should create Pool interface', () => {
      const iface = Pool__factory.createInterface();
      expect(iface).toBeDefined();
      expect(typeof iface.getFunction).toBe('function');
      expect(typeof iface.getEvent).toBe('function');
    });

    it('should create PoolNonTv interface', () => {
      const iface = PoolNonTv__factory.createInterface();
      expect(iface).toBeDefined();
      expect(typeof iface.getFunction).toBe('function');
      expect(typeof iface.getEvent).toBe('function');
    });

    it('Pool interface should parse function signatures', () => {
      const iface = Pool__factory.createInterface();
      const mintFunc = iface.getFunction('mint');
      expect(mintFunc).toBeDefined();
      expect(mintFunc.name).toBe('mint');
    });

    it('PoolNonTv interface should parse function signatures', () => {
      const iface = PoolNonTv__factory.createInterface();
      const mintFunc = iface.getFunction('mint');
      expect(mintFunc).toBeDefined();
      expect(mintFunc.name).toBe('mint');
    });
  });
});
