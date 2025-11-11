export interface Db {
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  execute(sql: string, params?: any[]): Promise<any>;
  inTx<T>(fn: (tx: Db) => Promise<T>): Promise<T>;
}