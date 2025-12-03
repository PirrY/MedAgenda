"use client";
import React from "react";
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaLock } from "react-icons/fa";
import useProfileForm from "../../../hooks/useProfileForm";
import ProfilePersonalInfo from "../../../components/molecules/ProfilePersonalInfo";
import ProfileContactInfo from "../../../components/molecules/ProfileContactInfo";
import ProfileAddressInfo from "../../../components/molecules/ProfileAddressInfo";
import ProfileEmergencyContact from "../../../components/molecules/ProfileEmergencyContact";
import ChangePasswordModal from "../../../components/molecules/ChangePasswordModal";

export default function ProfilePage() {
  const profile = useProfileForm();

  if (profile.authLoading || profile.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  if (!profile.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-[#4682B4] px-8 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <FaUser className="text-[#4682B4] text-4xl" />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold">
                    {profile.user.first_name} {profile.user.second_name} {profile.user.first_last_name} {profile.user.second_last_name}
                  </h1>
                  <p className="text-white/80 mt-1 flex items-center gap-2">
                    <FaEnvelope className="text-sm" />
                    {profile.user.user_email_address}
                  </p>
                </div>
              </div>
              {!profile.isEditing && (
                <button
                  onClick={() => profile.setIsEditing(true)}
                  className="bg-white text-[#4682B4] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 shadow-lg"
                >
                  <FaEdit />
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        {profile.successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {profile.successMessage}
          </div>
        )}

        {profile.error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {profile.error}
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Personal Information */}
          <ProfilePersonalInfo
            formData={profile.formData}
            isEditing={profile.isEditing}
            onInputChange={profile.handleInputChange}
          />

          {/* Contact Information */}
          <ProfileContactInfo
            formData={profile.formData}
            user={profile.user}
            isEditing={profile.isEditing}
            onInputChange={profile.handleInputChange}
          />

          {/* Address Information */}
          <ProfileAddressInfo
            formData={profile.formData}
            isEditing={profile.isEditing}
            onInputChange={profile.handleInputChange}
          />

          {/* Emergency Contact */}
          <ProfileEmergencyContact
            formData={profile.formData}
            isEditing={profile.isEditing}
            onInputChange={profile.handleInputChange}
          />

          {/* Action Buttons */}
          {profile.isEditing ? (
            <div className="flex gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={profile.handleSaveProfile}
                disabled={profile.isSaving}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {profile.isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Guardar Cambios
                  </>
                )}
              </button>
              <button
                onClick={profile.handleCancelEdit}
                disabled={profile.isSaving}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTimes />
                Cancelar
              </button>
            </div>
          ) : (
            <div className="pt-8 border-t border-gray-200">
              <button
                onClick={() => profile.setShowPasswordModal(true)}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaLock />
                Cambiar Contraseña
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      <ChangePasswordModal
        showPasswordModal={profile.showPasswordModal}
        passwordData={profile.passwordData}
        isChangingPassword={profile.isChangingPassword}
        onPasswordChange={profile.handlePasswordChange}
        onChangePassword={profile.handleChangePassword}
        onClose={() => {
          profile.setShowPasswordModal(false);
          profile.setPasswordData({
            current_password: "",
            new_password: "",
            confirm_password: "",
          });
          profile.setError(null);
        }}
      />
    </div>
  );
}
