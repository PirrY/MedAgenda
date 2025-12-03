import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from './useAuth';
import { getUserProfile, updateUserProfile, changePassword } from '../libs/userService';
import { User, UpdateUserDTO, ChangePasswordDTO } from '../interfaces/user';
import { useFormGuard } from './useFormGuard';
import { sanitizeString, validateName, validatePhone, validatePassword, INPUT_LIMITS } from '../utils/validation';

export default function useProfileForm() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const profileGuard = useFormGuard(5000);
  const passwordGuard = useFormGuard(5000);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
      } catch (error) {
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
    setError(null);
    setSuccessMessage(null);

    // Check form guard
    if (!profileGuard.startSubmission()) {
      setError('Ya hay una actualización en progreso. Por favor espera.');
      return;
    }

    try {
      // Sanitize and validate inputs
      const sanitizedData: UpdateUserDTO = {};

      if (formData.first_name) {
        const validation = validateName(formData.first_name);
        if (!validation.valid) {
          setError(validation.error ?? null);
          profileGuard.endSubmission();
          return;
        }
        sanitizedData.first_name = sanitizeString(formData.first_name);
      }

      if (formData.first_last_name) {
        const validation = validateName(formData.first_last_name);
        if (!validation.valid) {
          setError(validation.error ?? null);
          profileGuard.endSubmission();
          return;
        }
        sanitizedData.first_last_name = sanitizeString(formData.first_last_name);
      }

      if (formData.user_phone_number) {
        const validation = validatePhone(formData.user_phone_number);
        if (!validation.valid) {
          setError(validation.error ?? null);
          profileGuard.endSubmission();
          return;
        }
        sanitizedData.user_phone_number = sanitizeString(formData.user_phone_number);
      }

      // Sanitize other fields
      if (formData.second_name) sanitizedData.second_name = sanitizeString(formData.second_name);
      if (formData.second_last_name) sanitizedData.second_last_name = sanitizeString(formData.second_last_name);
      if (formData.address) sanitizedData.address = sanitizeString(formData.address);
      if (formData.city) sanitizedData.city = sanitizeString(formData.city);
      if (formData.state) sanitizedData.state = sanitizeString(formData.state);
      if (formData.country) sanitizedData.country = sanitizeString(formData.country);
      if (formData.emergency_contact_name) sanitizedData.emergency_contact_name = sanitizeString(formData.emergency_contact_name);
      if (formData.emergency_contact_phone) sanitizedData.emergency_contact_phone = sanitizeString(formData.emergency_contact_phone);
      if (formData.birth_date) sanitizedData.birth_date = formData.birth_date;
      if (formData.gender) sanitizedData.gender = formData.gender;

      const updatedUser = await updateUserProfile(sanitizedData);
      setUser(updatedUser);
      setIsEditing(false);
      setSuccessMessage("Perfil actualizado exitosamente");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      setError(error.message || "No se pudo actualizar tu perfil. Intenta de nuevo.");
    } finally {
      profileGuard.endSubmission();
    }
  };

  const handleChangePassword = async () => {
    setError(null);
    setSuccessMessage(null);

    // Check form guard
    if (!passwordGuard.startSubmission()) {
      setError('Ya hay un cambio de contraseña en progreso. Por favor espera.');
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(passwordData.new_password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.error ?? null);
      passwordGuard.endSubmission();
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      setError("Las contraseñas no coinciden");
      passwordGuard.endSubmission();
      return;
    }

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
      setError(error.message || "No se pudo cambiar tu contraseña. Verifica tu contraseña actual.");
    } finally {
      passwordGuard.endSubmission();
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

  return {
    user,
    isLoading,
    authLoading,
    isEditing,
    isSaving: profileGuard.isSubmitting,
    isChangingPassword: passwordGuard.isSubmitting,
    showPasswordModal,
    error,
    successMessage,
    formData,
    passwordData,
    setIsEditing,
    setShowPasswordModal,
    handleInputChange,
    handlePasswordChange,
    handleSaveProfile,
    handleChangePassword,
    handleCancelEdit,
    setPasswordData,
    setError,
  };
}
