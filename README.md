# Groupin
**Groupin** is a structured knowledge-sharing platform where users can store, organize, and share textual content using a folder-based hierarchy and a rich WYSIWYG editor.
It combines the power of a personal knowledge base with the discoverability of social platforms.
Users can keep content private, share it publicly, or explore what others have shared.

---

## ✨ Core Concept
Groupin is built around three pillars:
1. **Structure** – Organize content using folders and files
2. **Ownership** – Control privacy and sharing of your content
3. **Discovery** – Explore and interact with content from others

---

## 🛠 Tech Stack
### Frontend
- React.js
- TypeScript
- TanStack Router
- React Query
- React Hook Form
- Zod
- ShadCN UI (Base UI + HugeIcons)

### Backend
- Express.js
- PostgreSQL (Supabase)
- TypeScript
- compression, cors, express-rate-limit, helmet, hpp, pino
- Zod

---

## 🐳 Container Inspection Commands
Useful commands to quickly verify the Docker container environment.
**File system**
- `ls -la` - list all files including hidden ones
- `du -sh *` - size of each file/folder
- `du -sh .` - total directory size
- `find . | wc -l` - total number of files
**User & permissions**
- `whoami` - current user
- `id` - user and group IDs
**Permission test**
- `touch /root/test` - check if container user has root access (should fail in production)

---

## 📦 Features
### 📁 Content Management
- Create files and folders in a hierarchical structure
- Rich WYSIWYG editor for formatted text
- Save prompts, notes, boilerplates, or any textual content

### 🌍 Sharing & Social
- Make files or folders public
- Explore content shared by other users
- Upvote / Downvote posts
- Fork public content into your own workspace
- Bookmark posts
- Follow users and view their shared content

### 🔎 Search & Filters
- Search posts by title (indexed search)
- Filter by:
  - Folders / Files
  - Newest / Oldest
  - Popular / Unpopular
  - From people you follow
  - Tags

### 👤 Authentication & User System
- Login / Signup
- Google OAuth
- GitHub OAuth
- Email confirmation
- Forgot password flow
- Remember me option
- New device login detection with email verification
- User profile management
- Followers & following lists

---

## 🎯 Vision
Groupin aims to become a place where structured thinking meets social knowledge sharing —
a platform for developers, learners, and creators to organize their thoughts and contribute to a growing library of reusable knowledge.
