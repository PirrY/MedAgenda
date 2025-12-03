/**
 * Utilidades para rate limiting y debouncing
 */

/**
 * Debounce: Retrasa la ejecución de una función hasta que pasen X milisegundos sin que se llame
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle: Limita la ejecución de una función a una vez cada X milisegundos
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Rate Limiter para prevenir spam de clicks
 */
export class RateLimiter {
  private lastExecution: number = 0;
  private minInterval: number;

  constructor(minIntervalMs: number = 1000) {
    this.minInterval = minIntervalMs;
  }

  /**
   * Verifica si puede ejecutar la acción
   */
  canExecute(): boolean {
    const now = Date.now();
    if (now - this.lastExecution >= this.minInterval) {
      this.lastExecution = now;
      return true;
    }
    return false;
  }

  /**
   * Ejecuta la función solo si ha pasado el intervalo mínimo
   */
  execute<T extends (...args: any[]) => any>(func: T, ...args: Parameters<T>): boolean {
    if (this.canExecute()) {
      func(...args);
      return true;
    }
    return false;
  }

  /**
   * Resetea el limitador
   */
  reset(): void {
    this.lastExecution = 0;
  }
}

/**
 * Hook para usar rate limiting en componentes
 */
export function useRateLimiter(minIntervalMs: number = 1000) {
  const limiter = new RateLimiter(minIntervalMs);
  return limiter;
}

/**
 * Previene múltiples envíos de formularios
 */
export class FormSubmissionGuard {
  private isSubmitting: boolean = false;
  private submissionTimeout: NodeJS.Timeout | null = null;

  /**
   * Intenta iniciar un envío de formulario
   * @returns true si puede enviar, false si ya está enviando
   */
  startSubmission(autoResetMs: number = 5000): boolean {
    if (this.isSubmitting) {
      return false;
    }

    this.isSubmitting = true;

    // Auto-reset después de X segundos por seguridad
    if (this.submissionTimeout) {
      clearTimeout(this.submissionTimeout);
    }
    this.submissionTimeout = setTimeout(() => {
      this.endSubmission();
    }, autoResetMs);

    return true;
  }

  /**
   * Termina el envío del formulario
   */
  endSubmission(): void {
    this.isSubmitting = false;
    if (this.submissionTimeout) {
      clearTimeout(this.submissionTimeout);
      this.submissionTimeout = null;
    }
  }

  /**
   * Verifica si está enviando actualmente
   */
  isCurrentlySubmitting(): boolean {
    return this.isSubmitting;
  }
}
