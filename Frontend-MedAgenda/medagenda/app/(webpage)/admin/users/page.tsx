"use client";
import React, { useEffect, useState } from "react";
import { FaUsersCog, FaSearch, FaUser, FaUserMd, FaUserShield, FaEnvelope, FaPhone, FaSave, FaTimes, FaEdit } from "react-icons/fa";
import { getClinicUsers, searchUserByEmail, updateUserRole, getSpecialties } from "../../../../libs/adminService";
import { ClinicUser, UpdateUserRoleDTO, Specialty } from "../../../../interfaces/adminUser";
import useAuth from "../../../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function UsersManagementPage() {
    const router = useRouter();
    const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
    const [users, setUsers] = useState<ClinicUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<ClinicUser[]>([]);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchEmail, setSearchEmail] = useState("");
    const [editingUser, setEditingUser] = useState<ClinicUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form state para el usuario que se está editando
    const [roleForm, setRoleForm] = useState({
        is_doctor: false,
        is_admin: false,
        specialty_id: undefined as number | undefined,
    });

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || !isAdmin)) {
            router.push("/");
        }
    }, [authLoading, isAuthenticated, isAdmin, router]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersData, specialtiesData] = await Promise.all([
                    getClinicUsers(),
                    getSpecialties()
                ]);
                setUsers(usersData);
                setFilteredUsers(usersData);
                setSpecialties(specialtiesData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("No se pudo cargar la información. Por favor, intenta de nuevo.");
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated && isAdmin) {
            fetchData();
        }
    }, [isAuthenticated, isAdmin]);

    const handleSearch = async () => {
        if (!searchEmail.trim()) {
            setFilteredUsers(users);
            return;
        }

        try {
            setError(null);
            const user = await searchUserByEmail(searchEmail);
            setFilteredUsers([user]);
        } catch (error: any) {
            console.error("Error searching user:", error);
            if (error.message.includes("404")) {
                setError("No se encontró ningún usuario con ese email.");
            } else {
                setError("Error al buscar el usuario.");
            }
            setFilteredUsers([]);
        }
    };

    const handleClearSearch = () => {
        setSearchEmail("");
        setFilteredUsers(users);
        setError(null);
    };

    const handleEditUser = (user: ClinicUser) => {
        setEditingUser(user);
        setRoleForm({
            is_doctor: user.is_doctor,
            is_admin: user.is_admin,
            specialty_id: undefined,
        });
        setError(null);
        setSuccessMessage(null);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setRoleForm({
            is_doctor: false,
            is_admin: false,
            specialty_id: undefined,
        });
        setError(null);
    };

    const handleSaveRole = async () => {
        if (!editingUser) return;

        if (roleForm.is_doctor && !roleForm.specialty_id) {
            setError("Debes seleccionar una especialidad para el doctor.");
            return;
        }

        setIsSaving(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const updateData: UpdateUserRoleDTO = {
                user_email_address: editingUser.user_email_address,
                is_doctor: roleForm.is_doctor,
                is_admin: roleForm.is_admin,
                specialty_id: roleForm.is_doctor ? roleForm.specialty_id : undefined,
            };

            const updatedUser = await updateUserRole(updateData);

            // Actualizar la lista de usuarios
            const updatedUsers = users.map(u =>
                u.user_id === updatedUser.user_id ? updatedUser : u
            );
            setUsers(updatedUsers);

            // Actualizar usuarios filtrados si hay búsqueda activa
            if (searchEmail.trim()) {
                setFilteredUsers([updatedUser]);
            } else {
                setFilteredUsers(updatedUsers);
            }

            setSuccessMessage(`Rol actualizado exitosamente para ${updatedUser.first_name} ${updatedUser.first_last_name}`);
            setEditingUser(null);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error: any) {
            console.error("Error updating user role:", error);
            setError(error.message || "No se pudo actualizar el rol. Intenta de nuevo.");
        } finally {
            setIsSaving(false);
        }
    };

    const getRoleBadges = (user: ClinicUser) => {
        const badges = [];
        if (user.is_admin) {
            badges.push(
                <span key="admin" className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaUserShield />
                    Admin
                </span>
            );
        }
        if (user.is_doctor) {
            badges.push(
                <span key="doctor" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaUserMd />
                    Doctor
                </span>
            );
        }
        if (!user.is_admin && !user.is_doctor) {
            badges.push(
                <span key="patient" className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaUser />
                    Paciente
                </span>
            );
        }
        return badges;
    };

    if (authLoading || isLoading) {
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
                                value={searchEmail}
                                onChange={(e) => setSearchEmail(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="ejemplo@email.com"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-[#4682B4] text-white rounded-lg font-semibold hover:bg-[#3a6d96] transition-all duration-200"
                        >
                            Buscar
                        </button>
                        {searchEmail && (
                            <button
                                onClick={handleClearSearch}
                                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>

                {/* Users Table */}
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
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                                                        {user.first_name[0]}{user.first_last_name[0]}
                                                    </div>
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
                                                    {getRoleBadges(user)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">
                                                    {user.specialty_name || "-"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleEditUser(user)}
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
            </div>

            {/* Edit Role Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FaUsersCog className="text-blue-600" />
                            Editar Rol de Usuario
                        </h3>

                        {/* User Info */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600 mb-1">Usuario seleccionado:</p>
                            <p className="font-semibold text-gray-800">
                                {editingUser.first_name} {editingUser.first_last_name}
                            </p>
                            <p className="text-sm text-gray-600">{editingUser.user_email_address}</p>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-4 mb-6">
                            <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={roleForm.is_admin}
                                    onChange={(e) => setRoleForm({ ...roleForm, is_admin: e.target.checked })}
                                    className="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded"
                                />
                                <FaUserShield className="text-purple-600 text-xl" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">Administrador</p>
                                    <p className="text-sm text-gray-600">Gestión completa de la clínica</p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={roleForm.is_doctor}
                                    onChange={(e) => setRoleForm({ ...roleForm, is_doctor: e.target.checked })}
                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
                                />
                                <FaUserMd className="text-blue-600 text-xl" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">Doctor</p>
                                    <p className="text-sm text-gray-600">Puede atender pacientes y gestionar citas</p>
                                </div>
                            </label>

                            {/* Specialty Selection (only if doctor) */}
                            {roleForm.is_doctor && (
                                <div className="ml-12 mt-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Especialidad *
                                    </label>
                                    <select
                                        value={roleForm.specialty_id || ""}
                                        onChange={(e) => setRoleForm({ ...roleForm, specialty_id: Number(e.target.value) })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Seleccionar especialidad</option>
                                        {specialties.map((specialty) => (
                                            <option key={specialty.specialty_id} value={specialty.specialty_id}>
                                                {specialty.specialty_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleSaveRole}
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
                    </div>
                </div>
            )}
        </div>
    );
}
