import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaEdit } from 'react-icons/fa';
import { ClinicUser } from '../../interfaces/adminUser';
import UserAvatar from '../atoms/UserAvatar';
import RoleBadge from '../atoms/RoleBadge';

interface UsersTableProps {
  users: ClinicUser[];
  filteredUsers: ClinicUser[];
  searchEmail: string;
  onEditUser: (user: ClinicUser) => void;
}

const getUserRoles = (user: ClinicUser): Array<'admin' | 'doctor' | 'patient'> => {
  const roles: Array<'admin' | 'doctor' | 'patient'> = [];
  if (user.is_admin) roles.push('admin');
  if (user.is_doctor) roles.push('doctor');
  if (!user.is_admin && !user.is_doctor) roles.push('patient');
  return roles;
};

export default function UsersTable({ users, filteredUsers, searchEmail, onEditUser }: UsersTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#4682B4] text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Usuario</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Teléfono</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Roles</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Especialidad</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <FaUser className="mx-auto text-4xl text-gray-300 mb-3" />
                  <p>No se encontraron usuarios</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        firstName={user.first_name}
                        lastName={user.first_last_name}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user.first_name} {user.second_name} {user.first_last_name} {user.second_last_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEnvelope className="text-gray-400 text-sm" />
                      <span className="text-sm">{user.user_email_address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone className="text-gray-400 text-sm" />
                      <span className="text-sm">{user.user_phone_number || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {getUserRoles(user).map((role) => (
                        <RoleBadge key={role} role={role} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {user.specialty_name || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onEditUser(user)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-semibold"
                    >
                      <FaEdit />
                      Editar Rol
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Total de usuarios: <span className="font-semibold">{users.length}</span>
          {searchEmail && ` | Mostrando: ${filteredUsers.length}`}
        </p>
      </div>
    </div>
  );
}
