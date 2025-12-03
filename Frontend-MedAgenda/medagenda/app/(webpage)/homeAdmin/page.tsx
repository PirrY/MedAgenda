"use client";
import React, { useEffect, useState } from "react";
import { FaUsersCog, FaChartBar, FaSearch, FaUser, FaUserMd, FaUserShield, FaEnvelope, FaPhone, FaSave, FaTimes, FaEdit, FaBuilding } from "react-icons/fa";
import { getClinicUsers, searchUserByEmail, updateUserRole, getSpecialties, getUserAdminClinics, addMemberToClinic } from "../../../libs/adminService";
import { ClinicUser, UpdateUserRoleDTO, Specialty, UserClinic, AddMemberToClinicDTO } from "../../../interfaces/adminUser";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import Heading from "../../../components/atoms/Heading";

export default function AHome() {
    const router = useRouter();
    const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<"users" | "stats">("users");
    const [users, setUsers] = useState<ClinicUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<ClinicUser[]>([]);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [userClinics, setUserClinics] = useState<UserClinic[]>([]);
    const [selectedClinicId, setSelectedClinicId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchEmail, setSearchEmail] = useState("");
    const [editingUser, setEditingUser] = useState<ClinicUser | null>(null);
    const [isNewMember, setIsNewMember] = useState(false); // Si el usuario no está en la clínica aún
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

    // Cargar clínicas del usuario admin
    useEffect(() => {
        const fetchClinics = async () => {
            try {
                console.log("Fetching clínicas del admin...");
                const clinicsData = await getUserAdminClinics();
                console.log("Clínicas recibidas:", clinicsData);

                // Filtrar clínicas duplicadas por clinic_id
                const uniqueClinics = clinicsData.filter((clinic, index, self) =>
                    index === self.findIndex((c) => c.clinic_id === clinic.clinic_id)
                );

                console.log("Clínicas únicas:", uniqueClinics);
                setUserClinics(uniqueClinics);

                // Seleccionar la primera clínica por defecto
                if (uniqueClinics.length > 0) {
                    setSelectedClinicId(uniqueClinics[0].clinic_id);
                }
            } catch (error: any) {
                console.error("Error cargando clínicas:", error);
                setError("No se pudieron cargar las clínicas. Por favor, intenta de nuevo.");
            }
        };

        if (isAuthenticated && isAdmin) {
            fetchClinics();
        }
    }, [isAuthenticated, isAdmin]);

    // Cargar usuarios y especialidades cuando cambia la clínica seleccionada
    useEffect(() => {
        const fetchData = async () => {
            if (!selectedClinicId) return;

            try {
                setIsLoading(true);
                console.log("Fetching usuarios para clínica:", selectedClinicId);
                const usersData = await getClinicUsers(selectedClinicId);
                console.log("Usuarios recibidos:", usersData);

                console.log("Fetching especialidades...");
                const specialtiesData = await getSpecialties();
                console.log("Especialidades recibidas:", specialtiesData);

                setUsers(usersData);
                setFilteredUsers(usersData);
                setSpecialties(specialtiesData || []);
            } catch (error: any) {
                console.error("Error completo:", error);
                setError("No se pudo cargar la información. Por favor, intenta de nuevo.");
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated && isAdmin && selectedClinicId) {
            fetchData();
        }
    }, [isAuthenticated, isAdmin, selectedClinicId]);

    const handleSearch = async () => {
        if (!searchEmail.trim()) {
            setFilteredUsers(users);
            return;
        }

        try {
            setError(null);
            const user = await searchUserByEmail(searchEmail);

            // Verificar si el usuario ya está en la clínica actual
            const isInClinic = users.some(u => u.user_id === user.user_id);

            console.log("Usuario encontrado:", user);
            console.log("¿Ya está en la clínica?:", isInClinic);

            if (!isInClinic) {
                // Usuario encontrado pero no está en esta clínica
                setSuccessMessage(`Usuario encontrado: ${user.first_name} ${user.first_last_name}. Haz clic en "Agregar a Clínica" para añadirlo.`);
            }

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

    const handleEditUser = (user: ClinicUser, isNew: boolean = false) => {
        console.log("Editando usuario:", user);
        console.log("¿Es nuevo en la clínica?:", isNew);
        console.log("Especialidades disponibles:", specialties);

        setEditingUser(user);
        setIsNewMember(isNew);
        setRoleForm({
            is_doctor: user.is_doctor || false,
            is_admin: user.is_admin || false,
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
        if (!editingUser || !selectedClinicId) return;

        if (roleForm.is_doctor && !roleForm.specialty_id) {
            setError("Debes seleccionar una especialidad para el doctor.");
            return;
        }

        setIsSaving(true);
        setError(null);
        setSuccessMessage(null);

        try {
            let updatedUser: ClinicUser;

            if (isNewMember) {
                // Usuario NUEVO en la clínica - usar addMemberToClinic
                const addData: AddMemberToClinicDTO = {
                    clinic_id: selectedClinicId,
                    user_id: editingUser.user_id,
                    role_within_clinic: roleForm.is_admin ? "Admin" : "Doctor",
                    role_description: roleForm.is_doctor && roleForm.specialty_id
                        ? `Doctor - ${specialties.find(s => s.specialty_id === roleForm.specialty_id)?.specialty_name}`
                        : undefined,
                };

                console.log("📤 Agregando nuevo miembro a la clínica:", addData);
                const response = await addMemberToClinic(addData);
                console.log("✅ Respuesta del backend:", response);

                // Si el backend no devuelve el usuario completo, usar el editingUser actualizado
                updatedUser = response || {
                    ...editingUser,
                    is_admin: roleForm.is_admin,
                    is_doctor: roleForm.is_doctor,
                    specialty_name: roleForm.specialty_id
                        ? specialties.find(s => s.specialty_id === roleForm.specialty_id)?.specialty_name
                        : undefined,
                };

                console.log("✅ Usuario para agregar a la lista:", updatedUser);

                // Agregar a la lista de usuarios
                const updatedUsers = [...users, updatedUser];
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);

                setSuccessMessage(`${editingUser.first_name} ${editingUser.first_last_name} agregado exitosamente a la clínica`);
            } else {
                // Usuario EXISTENTE - usar updateUserRole
                const updateData: UpdateUserRoleDTO = {
                    email: editingUser.user_email_address,
                    isDoctor: roleForm.is_doctor,
                    isAdmin: roleForm.is_admin,
                    specialty_id: roleForm.is_doctor ? roleForm.specialty_id : undefined,
                };

                console.log("📤 Actualizando rol de usuario existente:", updateData);
                updatedUser = await updateUserRole(updateData);
                console.log("✅ Usuario actualizado:", updatedUser);

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
            }

            setEditingUser(null);
            setIsNewMember(false);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error: any) {
            console.error("❌ Error completo:", error);
            console.error("❌ Error message:", error.message);
            console.error("❌ Error stack:", error.stack);

            let errorMessage = isNewMember
                ? "No se pudo agregar el usuario a la clínica. "
                : "No se pudo actualizar el rol. ";

            if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += "Error desconocido. Revisa la consola para más detalles.";
            }

            setError(errorMessage);
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
                <p className="mt-4 text-gray-600">Cargando panel de administración...</p>
            </div>
        );
    }

    const selectedClinic = userClinics.find(c => c.clinic_id === selectedClinicId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Heading text="Panel del" highlight="Administrador" />
                    {selectedClinic && (
                        <p className="text-gray-600 mt-2 flex items-center gap-2">
                            <FaBuilding className="text-[#4682B4]" />
                            Clínica: <span className="font-semibold text-gray-800">{selectedClinic.clinic_name}</span>
                        </p>
                    )}
                </div>

                {/* Clinic Selector */}
                {userClinics.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <FaBuilding className="text-[#4682B4]" />
                            {userClinics.length > 1 ? 'Seleccionar Clínica' : 'Clínica Actual'}
                        </label>
                        <select
                            value={selectedClinicId || ""}
                            onChange={(e) => setSelectedClinicId(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            disabled={userClinics.length === 1}
                        >
                            {userClinics.map((clinic) => (
                                <option key={clinic.clinic_id} value={clinic.clinic_id}>
                                    {clinic.clinic_name} ({clinic.role_within_clinic})
                                </option>
                            ))}
                        </select>
                        {userClinics.length === 1 && (
                            <p className="text-xs text-gray-500 mt-2">
                                Solo administras esta clínica
                            </p>
                        )}
                    </div>
                ) : (
                    // No hay clínicas - mostrar mensaje de error
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg mb-6">
                        <p className="font-semibold">⚠️ No se encontraron clínicas</p>
                        <p className="text-sm mt-1">
                            No tienes acceso a ninguna clínica como administrador. Contacta al soporte si esto es un error.
                        </p>
                        <p className="text-xs mt-2 text-gray-600">
                            Debug: userClinics.length = {userClinics.length}, selectedClinicId = {selectedClinicId}
                        </p>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "users"
                                ? "bg-[#4682B4] text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        <FaUsersCog className="text-xl" />
                        Gestión de Usuarios
                    </button>
                    <button
                        onClick={() => setActiveTab("stats")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "stats"
                                ? "bg-[#4682B4] text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        <FaChartBar className="text-xl" />
                        Estadísticas
                    </button>
                </div>

                {/* Content */}
                {activeTab === "users" ? (
                    <>
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
                                                        {users.some(u => u.user_id === user.user_id) ? (
                                                            // Usuario ya está en la clínica - mostrar botón Editar
                                                            <button
                                                                onClick={() => handleEditUser(user, false)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-semibold"
                                                            >
                                                                <FaEdit />
                                                                Editar Rol
                                                            </button>
                                                        ) : (
                                                            // Usuario no está en la clínica - mostrar botón Agregar
                                                            <button
                                                                onClick={() => handleEditUser(user, true)}
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 text-sm font-semibold"
                                                            >
                                                                <FaUserMd />
                                                                Agregar a Clínica
                                                            </button>
                                                        )}
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
                    </>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <FaChartBar className="mx-auto text-6xl text-gray-300 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Estadísticas del Sistema</h3>
                        <p className="text-gray-600">Esta sección estará disponible próximamente</p>
                    </div>
                )}
            </div>

            {/* Edit Role Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FaUsersCog className={isNewMember ? "text-green-600" : "text-blue-600"} />
                            {isNewMember ? "Agregar Usuario a la Clínica" : "Editar Rol de Usuario"}
                        </h3>

                        {/* User Info */}
                        <div className={`${isNewMember ? 'bg-green-50 border border-green-200' : 'bg-gray-50'} rounded-lg p-4 mb-6`}>
                            <p className="text-sm text-gray-600 mb-1">Usuario seleccionado:</p>
                            <p className="font-semibold text-gray-800">
                                {editingUser.first_name} {editingUser.first_last_name}
                            </p>
                            <p className="text-sm text-gray-600">{editingUser.user_email_address}</p>
                            {isNewMember && (
                                <p className="text-sm text-green-600 mt-2 font-semibold">
                                    Este usuario será agregado a la clínica
                                </p>
                            )}
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
                                        value={roleForm.specialty_id !== undefined ? roleForm.specialty_id : ""}
                                        onChange={(e) => setRoleForm({ ...roleForm, specialty_id: e.target.value ? Number(e.target.value) : undefined })}
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
