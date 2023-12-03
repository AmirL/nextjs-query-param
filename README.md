
# nextjs-query-param

A React hook for syncing a component's state with a specific query parameter in the URL in Next.js applications.

## Installation

```bash
npm install nextjs-query-param
```

Motivation
----------

Managing the state of a React component alongside URL parameters is a common requirement in Next.js applications. The `nextjs-query-param` hook simplifies this task by providing a convenient API for synchronizing a component's state with a specific query parameter in the URL.

### Key Motivations:

1.  **Instant State Updates:** The hook uses `useState` internally to provide immediate updates to the component's state, ensuring a responsive user experience.
2.  **URL Synchronization:** By syncing with URL parameters, the hook enables users to share or bookmark specific application states via URLs.
3.  **Flexible Validation:** The hook supports custom validation functions, making it easy to integrate with libraries like Zod for robust parameter validation.
4.  **Browser History Integration:** Seamlessly navigate through browser history with synchronized URL changes, enabling users to go back and forth while maintaining component state.

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

A custom React hook for syncing a component's state with a specific query parameter in the URL.

*   **Parameters:**
    *   `key` (string): The name of the query parameter.
    *   `validate` (function): A function to validate and transform the query parameter value.
*   **Returns:**
    *   `[state, setQueryParam]`: A tuple containing the state variable and a function to update the query parameter.



