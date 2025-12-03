import React from 'react';
import { FaUser } from 'react-icons/fa';
import { ClinicUser } from '../../interfaces/adminUser';
import SearchInput from '../atoms/SearchInput';
import UsersTable from './UsersTable';
import Alert from '../atoms/Alert';

interface AdminUsersSectionProps {
  users: ClinicUser[];
  filteredUsers: ClinicUser[];
  searchEmail: string;
  successMessage: string | null;
  error: string | null;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;
  onEditUser: (user: ClinicUser, isNew: boolean) => void;
}

export default function AdminUsersSection({
  users,
  filteredUsers,
  searchEmail,
  successMessage,
  error,
  onSearchChange,
  onSearch,
  onClearSearch,
  onEditUser,
}: AdminUsersSectionProps) {
  return (
    <>
      {/* Messages */}
      {successMessage && (
        <Alert variant="success" className="mb-6">
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Buscar usuario por email
        </label>
        <div className="flex gap-3">
          <SearchInput
            value={searchEmail}
            onChange={onSearchChange}
            onSearch={onSearch}
            placeholder="ejemplo@email.com"
            className="flex-1"
          />
          <button
            onClick={onSearch}
            className="px-6 py-3 bg-[#4682B4] text-white rounded-lg font-semibold hover:bg-[#3a6d96] transition-all duration-200"
          >
            Buscar
          </button>
          {searchEmail && (
            <button
              onClick={onClearSearch}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <UsersTable
        users={users}
        filteredUsers={filteredUsers}
        searchEmail={searchEmail}
        onEditUser={onEditUser}
      />
    </>
  );
}
