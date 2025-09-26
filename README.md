# Reddit Story Viewer

This is a [Next.js](https://nextjs.org/) application that allows users to view stories from Reddit. It provides features for sorting, filtering, and paginating through the stories. The data is sourced from a Turso/libSQL database.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (using Radix UI)
- **Database**: [Turso](https://turso.tech/)/[libSQL](https://libsql.org/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)

## Features

- **View Stories**: Browse stories fetched from a database.
- **Sorting**: Sort stories by creation date, score, or number of comments in ascending or descending order.
- **Filtering**:
  - Filter stories by time range (last week, last month, last year, all time).
  - Filter stories by flair.
  - Filter stories by tags.
- **Pagination**: Navigate through pages of stories.
- **Responsive Design**: The application is designed to work on various screen sizes.
- **Dark Mode**: Theme can be toggled between light and dark mode.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [pnpm](https://pnpm.io/)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/reddit-story.git
    cd reddit-story
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
TURSO_DATABASE_URL="your_turso_database_url"
TURSO_AUTH_TOKEN="your_turso_auth_token"
```

You can get these values from your [Turso](https://turso.tech/) dashboard.

### Running the Development Server

To run the application in development mode, use the following command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase.
- `pnpm format`: Formats the code with Prettier.
- `pnpm format:check`: Checks the formatting of the code.
