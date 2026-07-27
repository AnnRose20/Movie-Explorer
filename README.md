# 🎬 Movie Explorer

A full-stack Movie Explorer web application built using **Next.js** and **Django REST Framework**. Users can browse movies, search movies, view movie details, watch trailers, create an account, log in securely using JWT authentication, manage favorites, and contact the administrator.

---

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- User Profile
- Logout

### Movies
- Browse Popular Movies
- Top Rated Movies
- Upcoming Movies
- Search Movies
- Movie Details
- Movie Trailer
- Recommended Movies
- Pagination

### Favorites
- Add to Favorites
- Remove from Favorites
- View Favorite Movies
- User-specific Favorites

### Contact
- Contact Form
- Messages Stored in Database

### Responsive Design
- Desktop
- Tablet
- Mobile

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Lucide React

### Backend
- Django
- Django REST Framework
- Simple JWT

### Database
- SQLite

### API
- TMDB API

### Version Control
- Git
- GitHub

---

## 📁 Project Structure

```
Movie-Explorer
│
├── backend
│   ├── accounts
│   ├── contact
│   ├── movies
│   └── config
│
└── frontend
    ├── src
    ├── public
    └── package.json
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/AnnRose20/Movie-Explorer.git
```

---

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 Environment Variables

### Backend

Create a `.env` file inside the backend directory.

```
TMDB_API_KEY=YOUR_API_KEY
```

### Frontend

Create `.env.local`

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 📸 Screenshots

Add screenshots here.

- Home Page
- Movie Details
- Login
- Favorites
- Profile
- Contact Page

---

## 👩‍💻 Author

**Ann Rose Paul**

MCA Graduate

GitHub:
https://github.com/AnnRose20

---

## ⭐ Future Improvements

- Email Notification from Contact Form
- User Avatar Upload
- Password Reset
- Movie Reviews
- Ratings
- Watchlist
- Dark/Light Theme
- Deployment