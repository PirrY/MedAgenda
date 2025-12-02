"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, FaUserShield, FaLock, FaSave, FaTimes, FaEdit } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { getUserProfile, updateUserProfile, changePassword } from "../../../libs/userService";
import { User, UpdateUserDTO, ChangePasswordDTO } from "../../../interfaces/user";

export default function ProfilePage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<UpdateUserDTO>({});
    const [passwordData, setPasswordData] = useState<ChangePasswordDTO>({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [authLoading, isAuthenticated, router]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUserProfile();
                console.log("Datos del perfil recibidos:", data);
                setUser(data);
                setFormData({
                    first_name: data.first_name,
                    second_name: data.second_name,
                    first_last_name: data.first_last_name,
                    second_last_name: data.second_last_name,
                    user_phone_number: data.user_phone_number,
                    birth_date: data.birth_date,
                    gender: data.gender,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    emergency_contact_name: data.emergency_contact_name,
                    emergency_contact_phone: data.emergency_contact_phone,
                });
                console.log("FormData actualizado:", {
                    email: data.user_email_address,
                    phone: data.user_phone_number
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("No se pudo cargar tu perfil. Por favor, intenta de nuevo.");
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchUserProfile();
        }
    }, [isAuthenticated]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const updatedUser = await updateUserProfile(formData);
            setUser(updatedUser);
            setIsEditing(false);
            setSuccessMessage("Perfil actualizado exitosamente");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            setError(error.message || "No se pudo actualizar tu perfil. Intenta de nuevo.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.new_password !== passwordData.confirm_password) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (passwordData.new_password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        setIsChangingPassword(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await changePassword(passwordData);
            setShowPasswordModal(false);
            setPasswordData({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });
            setSuccessMessage("Contraseña cambiada exitosamente");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error: any) {
            console.error("Error changing password:", error);
            setError(error.message || "No se pudo cambiar tu contraseña. Verifica tu contraseña actual.");
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleCancelEdit = () => {
        if (user) {
            setFormData({
                first_name: user.first_name,
                second_name: user.second_name,
                first_last_name: user.first_last_name,
                second_last_name: user.second_last_name,
                user_phone_number: user.user_phone_number,
                birth_date: user.birth_date,
                gender: user.gender,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country,
                emergency_contact_name: user.emergency_contact_name,
                emergency_contact_phone: user.emergency_contact_phone,
            });
        }
        setIsEditing(false);
        setError(null);
    };

    if (authLoading || isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Cargando perfil...</p>
            </div>
        );
    }

    if (!user) {
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
                                        {user.first_name} {user.second_name} {user.first_last_name} {user.second_last_name}
                                    </h1>
                                    <p className="text-white/80 mt-1 flex items-center gap-2">
                                        <FaEnvelope className="text-sm" />
                                        {user.user_email_address}
                                    </p>
                                </div>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
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
                {successMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-center gap-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg flex items-center gap-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Personal Information */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FaUser className="text-blue-600" />
                            Información Personal
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Primer Nombre *
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Segundo Nombre
                                </label>
                                <input
                                    type="text"
                                    name="second_name"
                                    value={formData.second_name || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Primer Apellido *
                                </label>
                                <input
                                    type="text"
                                    name="first_last_name"
                                    value={formData.first_last_name || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Segundo Apellido
                                </label>
                                <input
                                    type="text"
                                    name="second_last_name"
                                    value={formData.second_last_name || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaCalendar className="inline mr-2" />
                                    Fecha de Nacimiento
                                </label>
                                <input
                                    type="date"
                                    name="birth_date"
                                    value={formData.birth_date?.split('T')[0] || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Género
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="O">Otro</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-8 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FaPhone className="text-blue-600" />
                            Información de Contacto
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="user_phone_number"
                                    value={formData.user_phone_number || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="Ej: +57 300 123 4567"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.user_email_address || ""}
                                    disabled
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500 mt-1">El email no se puede cambiar</p>
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="mb-8 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FaMapMarkerAlt className="text-blue-600" />
                            Dirección
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Dirección Completa
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Ciudad
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city || ""}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Estado/Provincia
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state || ""}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        País
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country || ""}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="mb-8 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FaUserShield className="text-blue-600" />
                            Contacto de Emergencia
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    name="emergency_contact_name"
                                    value={formData.emergency_contact_name || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="emergency_contact_phone"
                                    value={formData.emergency_contact_phone || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing ? (
                        <div className="flex gap-4 pt-8 border-t border-gray-200">
                            <button
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
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
                                onClick={handleCancelEdit}
                                disabled={isSaving}
                                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaTimes />
                                Cancelar
                            </button>
                        </div>
                    ) : (
                        <div className="pt-8 border-t border-gray-200">
                            <button
                                onClick={() => setShowPasswordModal(true)}
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
            {showPasswordModal && (
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
                                    onChange={handlePasswordChange}
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
                                    onChange={handlePasswordChange}
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
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleChangePassword}
                                disabled={isChangingPassword}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isChangingPassword ? "Cambiando..." : "Cambiar"}
                            </button>
                            <button
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setPasswordData({
                                        current_password: "",
                                        new_password: "",
                                        confirm_password: "",
                                    });
                                    setError(null);
                                }}
                                disabled={isChangingPassword}
                                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
