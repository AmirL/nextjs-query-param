import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

type toString = {
  toString(): string;
};

export type SetQueryParam<T extends toString> = (
  value: T,
  // Set it true on the last param update, and false when you need to update multiple params at once
  updateUrl?: boolean,
  // if prevParams is provided, it will use it instead of current url params
  // this is useful when you want to update multiple params at once
  prevParams?: URLSearchParams
) => URLSearchParams;

/**
 * Hook for replace useState with sync value with url.
 * It uses useState internally to make changes instantly,
 * but also syncs with url in case url is changed (back button clicked, or url changed manually)
 **/
export function useQueryParam<T extends toString>(key: string, validate: (value: string | null) => T) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryValueRaw = searchParams.get(key);
  // validate query value
  const queryValue = useMemo(() => validate(queryValueRaw), [queryValueRaw, validate]);

  const [value, setValue] = useState<T>(queryValue);
  const valueStr = useMemo(() => value.toString(), [value]);

  const setQueryParam: SetQueryParam<T> = (newValue, updateUrl = true, prevParams?) => {
    const newValueStr = newValue.toString();
    const params = prevParams || new URLSearchParams(searchParams.toString());
    if (newValueStr !== queryValueRaw) {
      setValue(newValue);
      params.set(key, newValueStr);
      if (updateUrl) {
        router.push(pathname + '?' + params.toString(), { scroll: false });
      }
    }
    return params;
  };

  // sync value with url, in case url is changed (back button for example)
  useEffect(() => {
    if (queryValueRaw !== valueStr) {
      setValue(queryValue);
    }
    // Don't sync when state value is changed, it's a one way sync
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryValue, queryValueRaw]);

  return [value, setQueryParam] as const;
}
