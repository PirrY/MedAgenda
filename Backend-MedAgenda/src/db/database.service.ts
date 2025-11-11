import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import { Db } from './types/types';

@Injectable()
export class DatabaseService implements OnModuleInit, Db {
  private pool!: mysql.Pool;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      user: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASS'),
      database: this.config.get<string>('DB_NAME'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await this.pool.query(sql, params);
    return rows as T[];
  }

  async execute(sql: string, params?: any[]): Promise<mysql.ResultSetHeader> {
    const [result] = await this.pool.execute<mysql.ResultSetHeader>(sql, params);
    return result;
  }

  async inTx<T>(fn: (tx: Db) => Promise<T>): Promise<T> {
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();

      const txDb: Db = {
        query: async <R = any>(sql: string, params?: any[]) => {
          const [rows] = await conn.query(sql, params);
          return rows as R[];
        },
        execute: async (sql: string, params?: any[]) => {
          const [res] = await conn.execute(sql, params);
          return res;
        },
        inTx: async <U>(inner: (tx: Db) => Promise<U>): Promise<U> => inner(txDb),
      };

      const out = await fn(txDb);
      await conn.commit();
      return out;
    } catch (e) {
      try { await conn.rollback(); } catch {}
      throw e;
    } finally {
      conn.release();
    }
  }

  async getConnection(): Promise<mysql.PoolConnection> {
    return this.pool.getConnection();
  }
}