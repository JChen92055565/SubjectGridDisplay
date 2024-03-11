This is a [Next.js](https://nextjs.org/) project that displays mock patient data.

Features include:
-filtering by gender, active status, and seraching by name
-sorting by last name, age, and date of diagnosis (ascending, and descending) through clickable table feature.

Assumptions and Design decisions made:
-It is not possbile to sort by multiple things (ie Name and Diagnosis date), so toggling any of the sorting through the clickable table feature will reset the current sorting method that is active
-A (click to sort) text was added when each sortable aspect of the table is in its default setting as to indicate to users that they can click to sort, otherwise if they are not aware of this feature, they may never find/discover it.

In order to run: run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
