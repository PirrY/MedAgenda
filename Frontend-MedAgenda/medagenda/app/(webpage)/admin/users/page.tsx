"use client";
import React from "react";
import { FaUsersCog, FaSearch } from "react-icons/fa";
import useUserManagement from "../../../../hooks/useUserManagement";
import UsersTable from "../../../../components/molecules/UsersTable";
import UserRoleModal from "../../../../components/molecules/UserRoleModal";

export default function UsersManagementPage() {
  const userMgmt = useUserManagement();

  if (userMgmt.authLoading || userMgmt.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaUsersCog className="text-[#4682B4] text-4xl" />
            <h1 className="text-4xl font-bold text-gray-800">
              Gestión de <span className="text-[#4682B4]">Usuarios</span>
            </h1>
          </div>
          <p className="text-gray-600">
            Administra los roles y permisos de los usuarios de tu clínica
          </p>
        </div>

        {/* Messages */}
        {userMgmt.successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {userMgmt.successMessage}
          </div>
        )}

        {userMgmt.error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {userMgmt.error}
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Buscar usuario por email
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={userMgmt.searchEmail}
                onChange={(e) => userMgmt.setSearchEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && userMgmt.handleSearch()}
                placeholder="ejemplo@email.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={userMgmt.handleSearch}
              className="px-6 py-3 bg-[#4682B4] text-white rounded-lg font-semibold hover:bg-[#3a6d96] transition-all duration-200"
            >
              Buscar
            </button>
            {userMgmt.searchEmail && (
              <button
                onClick={userMgmt.handleClearSearch}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Users Table */}
        <UsersTable
          users={userMgmt.users}
          filteredUsers={userMgmt.filteredUsers}
          searchEmail={userMgmt.searchEmail}
          onEditUser={userMgmt.handleEditUser}
        />
      </div>

      {/* Edit Role Modal */}
      <UserRoleModal
        editingUser={userMgmt.editingUser}
        roleForm={userMgmt.roleForm}
        specialties={userMgmt.specialties}
        isSaving={userMgmt.isSaving}
        onRoleFormChange={userMgmt.setRoleForm}
        onSave={userMgmt.handleSaveRole}
        onCancel={userMgmt.handleCancelEdit}
      />
    </div>
  );
}
