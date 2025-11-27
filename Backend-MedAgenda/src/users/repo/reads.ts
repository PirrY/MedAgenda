import { Db } from "src/db/types/types";

export async function existsByEmail(db: Db, email: string): Promise<boolean> {
    const q = await db.query('SELECT 1 FROM users WHERE user_email_address = ?',[email]);
    return q.length > 0;
    
}

export async function deriveIdFromEmail(db: Db, email: string): Promise<number> {
    const q = await db.query<number>('SELECT user_id FROM users WHERE user_email_address = ?', [email]);
    return q[0];
}