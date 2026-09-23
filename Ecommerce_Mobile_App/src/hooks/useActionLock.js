import { useState, useRef, useCallback } from 'react';

/**
 * Custom Hook for double-tap protection and visual action state management.
 * @param {number} lockDelayMs Optional lockout delay in ms after action completes (default: 400ms)
 * @returns {{ isProcessing: boolean, executeAction: (actionFn: Function) => Promise<any> }}
 */
export function useActionLock(lockDelayMs = 400) {
  const [isProcessing, setIsProcessing] = useState(false);
  const isLockedRef = useRef(false);

  const executeAction = useCallback(
    async (actionFn) => {
      if (isLockedRef.current || isProcessing) {
        return;
      }

      isLockedRef.current = true;
      setIsProcessing(true);

      try {
        const result = await Promise.resolve(actionFn());
        return result;
      } catch (error) {
        console.error('useActionLock action error:', error);
        throw error;
      } finally {
        setTimeout(() => {
          isLockedRef.current = false;
          setIsProcessing(false);
        }, lockDelayMs);
      }
    },
    [isProcessing, lockDelayMs]
  );

  return { isProcessing, executeAction };
}
