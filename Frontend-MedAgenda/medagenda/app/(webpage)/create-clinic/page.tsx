"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth';
import useCreateClinicForm from '../../../hooks/useCreateClinicForm';
import CityAutocomplete from '../../../components/molecules/CityAutocomplete';
import StateCountryFields from '../../../components/molecules/StateCountryFields';
import SpecialtiesSelector from '../../../components/molecules/SpecialtiesSelector';
import InputField from '../../../components/atoms/InputField';
import { FaBuilding, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { INPUT_LIMITS } from '../../../utils/validation';

export default function CreateClinicPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const form = useCreateClinicForm();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4682B4] to-[#5C95FF] text-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <FaBuilding className="text-5xl" />
            <div>
              <h1 className="text-4xl font-bold">Crear Nueva Clínica</h1>
              <p className="text-blue-100 mt-2">Completa la información para registrar tu clínica</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {form.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            ¡Clínica creada exitosamente! Redirigiendo...
          </div>
        )}

        {/* Error Message */}
        {form.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {form.error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Clinic Name */}
            <InputField
              label="Nombre de la Clínica"
              name="clinic_name"
              value={form.formData.clinic_name}
              onChange={(e) => form.setFormData({ ...form.formData, clinic_name: e.target.value })}
              placeholder="Ej: Clínica Santa María"
              disabled={form.isSubmitting}
              icon={<FaBuilding />}
              maxLength={INPUT_LIMITS.NAME}
              showCharCount
              required
            />

            {/* Phone Number */}
            <InputField
              label="Teléfono"
              name="clinic_phone_number"
              type="tel"
              value={form.formData.clinic_phone_number}
              onChange={(e) => form.setFormData({ ...form.formData, clinic_phone_number: e.target.value })}
              placeholder="Ej: +57 300 1234567"
              disabled={form.isSubmitting}
              icon={<FaPhone />}
              maxLength={INPUT_LIMITS.PHONE}
              showCharCount
              required
            />

            {/* Address */}
            <InputField
              label="Dirección"
              name="clinic_address"
              value={form.formData.clinic_address}
              onChange={(e) => form.setFormData({ ...form.formData, clinic_address: e.target.value })}
              placeholder="Ej: Calle 50 #45-30"
              disabled={form.isSubmitting}
              icon={<FaMapMarkerAlt />}
              maxLength={INPUT_LIMITS.ADDRESS}
              showCharCount
              required
            />

            {/* City Autocomplete */}
            <CityAutocomplete
              citySearch={form.citySearch}
              cityResults={form.cityResults}
              selectedCity={form.selectedCity}
              showCityDropdown={form.showCityDropdown}
              isSearchingCities={form.isSearchingCities}
              isSubmitting={form.isSubmitting}
              onCityInputChange={form.handleCityInputChange}
              onCitySelect={form.handleCitySelect}
              setShowCityDropdown={form.setShowCityDropdown}
            />

            {/* State & Country Fields (shown when no city matches) */}
            {form.showNewCityFields && form.citySearch && (
              <StateCountryFields
                citySearch={form.citySearch}
                stateSearch={form.stateSearch}
                stateResults={form.stateResults}
                selectedState={form.selectedState}
                showStateDropdown={form.showStateDropdown}
                isSearchingStates={form.isSearchingStates}
                showNewStateFields={form.showNewStateFields}
                countrySearch={form.countrySearch}
                countryResults={form.countryResults}
                selectedCountry={form.selectedCountry}
                showCountryDropdown={form.showCountryDropdown}
                isSearchingCountries={form.isSearchingCountries}
                isSubmitting={form.isSubmitting}
                onStateInputChange={form.handleStateInputChange}
                onStateSelect={form.handleStateSelect}
                onCountryInputChange={form.handleCountryInputChange}
                onCountrySelect={form.handleCountrySelect}
                setShowStateDropdown={form.setShowStateDropdown}
                setShowCountryDropdown={form.setShowCountryDropdown}
              />
            )}

            {/* Specialties Selection */}
            <SpecialtiesSelector
              specialties={form.specialties}
              selectedSpecialtyIds={form.selectedSpecialtyIds}
              loadingSpecialties={form.loadingSpecialties}
              showNewSpecialtyInput={form.showNewSpecialtyInput}
              newSpecialtyName={form.newSpecialtyName}
              isCreatingSpecialty={form.isCreatingSpecialty}
              isSubmitting={form.isSubmitting}
              onToggleSpecialty={form.toggleSpecialty}
              onCreateSpecialty={form.handleCreateSpecialty}
              setShowNewSpecialtyInput={form.setShowNewSpecialtyInput}
              setNewSpecialtyName={form.setNewSpecialtyName}
            />

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                Descripción (Opcional)
              </label>
              <textarea
                value={form.formData.clinic_description}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= INPUT_LIMITS.DESCRIPTION) {
                    form.setFormData({ ...form.formData, clinic_description: value });
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4682B4] resize-none"
                placeholder="Describe brevemente tu clínica..."
                rows={4}
                maxLength={INPUT_LIMITS.DESCRIPTION}
                disabled={form.isSubmitting}
              />
              <p className={`text-xs mt-1 text-right ${form.formData.clinic_description.length > INPUT_LIMITS.DESCRIPTION * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
                {form.formData.clinic_description.length}/{INPUT_LIMITS.DESCRIPTION}
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={form.isSubmitting}
                className="w-full bg-gradient-to-r from-[#4682B4] to-[#5C95FF] text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {form.isSubmitting ? 'Creando Clínica...' : 'Crear Clínica'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
