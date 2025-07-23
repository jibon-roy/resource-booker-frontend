# ResourceBooker

ResourceBooker is a **resource booking and management system** built with **Next.js 15**, **TypeScript**, and **TailwindCSS**.  
It allows users to manage bookings of conference rooms, projectors, laptops, and more — all in a clean and interactive dashboard with **real-time updates** and **dynamic pagination**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=flat&logo=prisma)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat&logo=node.js)

---

## Live Links

- Frontend: [ResourceBooker](https://resourcebooker.vercel.app)
- Backend: [ResourceBooker API](https://resource-booker-backend.vercel.app)

## Features

✅ **Resource Management** – Manage conference rooms, projectors, and laptops with ease.  
✅ **Advanced Filtering** – Filter by date, resource, and booking status (`upcoming`, `ongoing`, `past`).  
✅ **Dynamic Pagination** – Ant Design–like pagination, built using **pure TailwindCSS**.  
✅ **Real-time Updates** – Automatic status updates (`upcoming → ongoing → past`).  
✅ **Secure Delete with Confirmation** – SweetAlert2 for confirmation dialogs.  
✅ **Clean UI** – Built with **Tailwind** for a minimal, responsive design.  
✅ **Prisma ORM** – Type-safe database queries with PostgreSQL or MongoDB.

---

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Redux Toolkit, TailwindCSS
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: MongoDB / PostgreSQL
- **UI Components**: TailwindCSS, Lucide Icons, SweetAlert2

---

## Getting Started

### 1️. Clone & Install

```bash
git clone https://github.com/jibon-roy/resourcebooker.git
cd resourcebooker

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
#or
bun install
```

## 2. Environment Setup

Create a `.env` file in the project root:

```bash
# .env
# backend url
NEXT_PUBLIC_BASE_URL=https://resource-booker-backend.vercel.app
```

## 3. Run in Development

```bash
npm run dev
# or
yarn dev
#or
pnpm dev
#or
bun run dev
```

## 4. Run in Production

```bash
npm run build
#then
npm run start
```

<p align="center">

| ![Dashboard Preview](src/assets/thank-you-2.gif) |
| :----------------------------------------------: |
|    **Thanks for checking out this project!**     |

</p>
