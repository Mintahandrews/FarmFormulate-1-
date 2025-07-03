/**
 * Helper functions for React refs to fix TypeScript errors
 */

/**
 * Creates a ref callback that properly handles the TypeScript return type
 * This fixes the common error: "Type is not assignable to type 'Ref<Element> | undefined'"
 */
export function createRefCallback<T extends HTMLElement>(
  setter: (element: T | null) => void
) {
  return (element: T | null) => {
    setter(element);
    return undefined;
  };
}
