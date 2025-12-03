import { useState, useCallback } from 'react';

/**
 * Hook para proteger formularios contra múltiples envíos
 */
export function useFormGuard(autoResetMs: number = 5000) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startSubmission = useCallback((): boolean => {
    if (isSubmitting) {
      return false;
    }

    setIsSubmitting(true);

    // Auto-reset por seguridad
    setTimeout(() => {
      setIsSubmitting(false);
    }, autoResetMs);

    return true;
  }, [isSubmitting, autoResetMs]);

  const endSubmission = useCallback(() => {
    setIsSubmitting(false);
  }, []);

  return {
    isSubmitting,
    startSubmission,
    endSubmission,
  };
}
