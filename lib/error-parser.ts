import { UseFormReturn } from 'react-hook-form';

export interface ApiProblemDetails {
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
  detail?: string;
  message?: string;
}

/**
 * Handles API errors, returning a generic error string for toasts
 * and optionally setting field errors in react-hook-form.
 */
export function handleApiError(
  error: any,
  form?: UseFormReturn<any>
): string {
  if (!error.response) {
    return 'A network error occurred. Please try again later.';
  }

  const { status, data } = error.response;
  
  if (status === 429) {
    return 'Too many attempts. Please try again later.';
  }

  if (status === 409) {
    return data?.message || data?.detail || 'A conflict occurred.';
  }

  if (status === 500) {
    return 'An unexpected error occurred. Please try again later.';
  }

  if (status === 401) {
    return 'Your session has expired. Please log in again.';
  }

  if (status === 400 && data) {
    const problem = data as ApiProblemDetails;
    
    // If we have a form and validation errors, bind them
    if (form && problem.errors) {
      Object.keys(problem.errors).forEach((key) => {
        // API often returns PascalCase or camelCase, map to form fields (camelCase expected)
        const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
        form.setError(fieldName as any, {
          type: 'server',
          message: problem.errors![key][0],
        });
      });
      return problem.title || 'Please correct the validation errors below.';
    }

    return problem.detail || problem.message || problem.title || 'Bad Request';
  }

  return 'An unexpected error occurred.';
}
