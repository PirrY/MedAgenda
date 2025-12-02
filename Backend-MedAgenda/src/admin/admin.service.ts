import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import * as AdminReads from './repo/reads';
import * as AdminWrites from './repo/writes';
import * as UserReads from '../users/repo/reads';
import { UpdateUserRoleDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
    constructor(private readonly db: DatabaseService) {}

    /**
     * Verify that the requesting user is an admin and return their clinic ID
     */
    private async verifyAdminAndGetClinicId(adminUserId: number): Promise<number> {
        const clinicId = await AdminReads.getAdminClinicId(this.db, adminUserId);
        if (!clinicId) {
            throw new ForbiddenException('User is not an admin of any clinic');
        }
        return clinicId;
    }

    /**
     * Get all users from the admin's clinic
     */
    async getClinicUsers(adminUserId: number): Promise<AdminReads.ClinicUser[]> {
        const clinicId = await this.verifyAdminAndGetClinicId(adminUserId);
        return await AdminReads.getClinicUsers(this.db, clinicId);
    }

    /**
     * Search for a user by email
     */
    async searchUserByEmail(adminUserId: number, email: string): Promise<AdminReads.ClinicUser> {
        const clinicId = await this.verifyAdminAndGetClinicId(adminUserId);

        const user = await AdminReads.searchUserByEmail(this.db, email, clinicId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    /**
     * Update a user's role within the clinic
     */
    async updateUserRole(adminUserId: number, dto: UpdateUserRoleDto): Promise<{ message: string }> {
        const clinicId = await this.verifyAdminAndGetClinicId(adminUserId);

        // Validate: if isDoctor is true, specialty_id is required
        if (dto.isDoctor && !dto.specialty_id) {
            throw new BadRequestException('specialty_id is required when setting isDoctor to true');
        }

        // Find the user by email
        const user = await UserReads.deriveIdFromEmail(this.db, dto.email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const userId = user;

        // Check if user is a member of this clinic, if not add them
        const isMember = await AdminReads.isUserMemberOfClinic(this.db, userId, clinicId);

        // Determine the role to set
        let role: 'Admin' | 'Doctor' | 'Employee';
        if (dto.isAdmin) {
            role = 'Admin';
        } else if (dto.isDoctor) {
            role = 'Doctor';
        } else {
            role = 'Employee';
        }

        if (isMember) {
            // Update existing membership
            await AdminWrites.updateUserRoleInClinic(this.db, userId, clinicId, role);
        } else {
            // Add user to clinic
            await AdminWrites.addUserToClinic(this.db, userId, clinicId, role);
        }

        // Handle doctor specialties
        if (dto.isDoctor && dto.specialty_id) {
            // Remove existing specialties and add the new one
            await AdminWrites.removeAllSpecialtiesFromDoctor(this.db, userId);
            await AdminWrites.assignSpecialtyToDoctor(this.db, userId, dto.specialty_id);
        } else if (!dto.isDoctor) {
            // If no longer a doctor, remove all specialties
            await AdminWrites.removeAllSpecialtiesFromDoctor(this.db, userId);
        }

        return { message: 'User role updated successfully' };
    }

    /**
     * Get all available specialties
     */
    async getAllSpecialties(): Promise<AdminReads.Specialty[]> {
        return await AdminReads.getAllSpecialties(this.db);
    }
}
