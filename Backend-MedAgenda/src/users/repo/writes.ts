import { Db } from "src/db/types/types";
import { CreateUserDto } from "../dto/users.dto";

export async function insertUser(db: Db, dto: CreateUserDto): Promise<void> {
    await db.execute(
        'INSERT INTO users (first_name, second_name, first_last_name, second_last_name, legal_id, user_phone_number, user_email_address, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [dto.first_name, dto.second_name, dto.first_last_name, dto.second_last_name, dto.legal_id, dto.user_phone_number, dto.user_email_address.toLowerCase(), dto.password]
    );
}