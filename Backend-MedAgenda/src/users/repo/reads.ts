import { Db } from "src/db/types/types";

export async function existsByEmail(db: Db, email: string): Promise<boolean> {
    console.log(email.toLowerCase());
    const q = await db.query('SELECT 1 FROM users WHERE user_email_address = ?',[email]);
    return q.length > 0;
    
}