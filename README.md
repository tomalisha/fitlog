# B14-A6-Fit Log

FitLog is a modern workout library and workout planning website where users can explore exercises, view detailed workout information, build today's workout plan, save workouts for later, and track completed exercises.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- REST API
- LocalStorage
- Git & GitHub

## Features

1. **Workout Library**
   - Displays 12 workouts from the FitLog API.
   - Shows workout images, muscle groups, equipment, duration, calories, and ratings.

2. **Workout Details**
   - Dynamic workout detail pages.
   - Shows workout description, equipment, difficulty, sets, reps, duration, calories, rating, and instructions.

3. **My Plan**
   - Add workouts to today's plan.
   - View plan statistics including exercises, total minutes, and calories.
   - Mark workouts as completed.
   - Remove workouts from the plan.

4. **Save for Later**
   - Save workouts for later.
   - View saved workouts from the My Plan page.
   - Remove saved workouts when no longer needed.

5. **Workout Sorting**
   - Sort workouts by duration, calories, or rating.
   - Responsive layout for mobile, tablet, and desktop devices.

## API

All workout data is fetched from:

https://api.abcz.workers.dev/api/fitlog

Single workout:

https://api.abcz.workers.dev/api/fitlog/:id

## Project Structure

```text
fitlog/
├── app/
│   ├── my-plan/
│   ├── workouts/
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
├── lib/
├── types/
├── public/
├── README.md
└── package.json