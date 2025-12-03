import React from 'react';
import { FaLock } from 'react-icons/fa';
import { ChangePasswordDTO } from '../../interfaces/user';

interface ChangePasswordModalProps {
  showPasswordModal: boolean;
  passwordData: ChangePasswordDTO;
  isChangingPassword: boolean;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: () => void;
  onClose: () => void;
}

export default function ChangePasswordModal({
  showPasswordModal,
  passwordData,
  isChangingPassword,
  onPasswordChange,
  onChangePassword,
  onClose,
}: ChangePasswordModalProps) {
  if (!showPasswordModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaLock className="text-blue-600" />
          Cambiar Contraseña
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña Actual
            </label>
            <input
              type="password"
              name="current_password"
              value={passwordData.current_password}
              onChange={onPasswordChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              name="new_password"
              value={passwordData.new_password}
              onChange={onPasswordChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              name="confirm_password"
              value={passwordData.confirm_password}
              onChange={onPasswordChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onChangePassword}
            disabled={isChangingPassword}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChangingPassword ? "Cambiando..." : "Cambiar"}
          </button>
          <button
            onClick={onClose}
            disabled={isChangingPassword}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
