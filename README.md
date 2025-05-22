This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


##  Objective

Build an AutoComplete search field that:
- Fetches suggestions from an API as the user types.
- Displays suggestions in a dropdown.
- Avoids unnecessary API calls.
- Provides a smooth and responsive UI experience.

---


##Thought Processs

i have used fetch to get the data from the given api and have used react hooks such as useState ,useEffect
i have also implemented debouncing using setTimeout.also used try and catch to catch the error if any.

Used React hooks:
useState to manage input, results, loading, and dropdown visibility.
useEffect to trigger API calls when input changes.

### . Debouncing for Optimization
- Implemented a 300ms debounce using `setTimeout` inside `useEffect` to delay API requests until the user pauses typing.
- Cleared the timeout on each keystroke to avoid rapid requests.
### 3. Conditional Search
- Triggered the API call only if the input length is 2 or more characters to reduce noise and avoid unnecessary API hits.

### . UI Design
- Used TailwindCSS for styling.
- Displayed results in a dropdown-like container under the search input.
- Added hover effect to dropdown items for better UX.
- Showed a loading indicator while the API call is in progress.

---
- 
