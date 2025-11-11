import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, password_hash: string): Promise<boolean> {
    return await bcrypt.compare(password, password_hash);
}