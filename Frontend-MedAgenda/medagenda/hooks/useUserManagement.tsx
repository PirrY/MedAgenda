import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from './useAuth';
import { getClinicUsers, searchUserByEmail, updateUserRole, getSpecialties } from '../libs/adminService';
import { ClinicUser, UpdateUserRoleDTO, Specialty } from '../interfaces/adminUser';

export default function useUserManagement() {
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
        email: editingUser.user_email_address,
        isDoctor: roleForm.is_doctor,
        isAdmin: roleForm.is_admin,
        specialty_id: roleForm.is_doctor ? roleForm.specialty_id : undefined,
      };

      const updatedUser = await updateUserRole(updateData);

      const updatedUsers = users.map(u =>
        u.user_id === updatedUser.user_id ? updatedUser : u
      );
      setUsers(updatedUsers);

      if (searchEmail.trim()) {
        setFilteredUsers([updatedUser]);
      } else {
        setFilteredUsers(updatedUsers);
      }

      setSuccessMessage(`Rol actualizado exitosamente para ${updatedUser.first_name} ${updatedUser.first_last_name}`);
      setEditingUser(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      setError(error.message || "No se pudo actualizar el rol. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    users,
    filteredUsers,
    specialties,
    isLoading,
    authLoading,
    searchEmail,
    editingUser,
    error,
    successMessage,
    isSaving,
    roleForm,
    setSearchEmail,
    setRoleForm,
    handleSearch,
    handleClearSearch,
    handleEditUser,
    handleCancelEdit,
    handleSaveRole,
  };
}
