
# nextjs-query-param

A type-safe React hook for seamlessly synchronizing a component's state with a URL parameter in Next.js applications.

## Installation

```bash
npm install nextjs-query-param
```

Motivation
----------

Managing a component's state alongside URL parameters is a common need in Next.js applications. The `nextjs-query-param` hook simplifies this task, offering a type-safe API for effortless synchronization.

### Key Motivations:

1. **Instant State Updates:** Utilizes `useState` for immediate state updates, ensuring a responsive user experience.
2. **URL Synchronization:** Enables easy sharing and bookmarking of specific application states through URL parameters.
3. **TypeScript Compatibility:** Designed for TypeScript, providing complete type safety through custom validation functions.
4. **Browser History Integration:** Seamlessly navigate through browser history with synchronized URL changes.

## Usage
-----

```typescript
import { useQueryParam } from 'nextjs-query-param';
import { z } from 'zod';

// Example: Syncing state with Zod validation
export const SortColumnSchema = z.enum(['title', 'renewalDate', 'followUpDate', 'userLicensesLeft']).catch('title');
export const SortDirectionSchema = z.enum(['asc', 'desc']).catch('asc');
export type SortColumn = z.infer<typeof SortColumnSchema>;
export type SortDirection = z.infer<typeof SortDirectionSchema>;

const MyComponent = () => {
  const [sortColumn, setSortColumn] = useQueryParam('sortColumn', (value) => SortColumnSchema.parse(value));
  const [sortDirection, setSortDirection] = useQueryParam('sortDirection', (value) => SortDirectionSchema.parse(value));

  // Change only one value
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Change more than one param at once
  const handleColumnClick = (clickedColumn: SortColumn) => {
    const params = setSortColumn(clickedColumn, sortDirection === 'asc');
    if (sortDirection === 'desc') {
      setSortDirection('asc', true, params);
    }
  };

  // Use 'sortColumn' and 'sortDirection' in your component
  // ...

  return (
    // JSX for your component
  );
};

```

## API
### `useQueryParam(key, validate)`

*   **Parameters:**
    *   `key` (string): The name of the query parameter.
    *   `validate` (function): A function to validate and transform the query parameter value.
*   **Returns:**
    *   `[state, setQueryParam]`: A tuple containing the state variable and a function to update the query parameter.



