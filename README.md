# Task Manager App

A full-stack Task Manager application built with **Django** (backend) and **React + Vite + Tailwind CSS** (frontend).


## Features

- Add, edit, and delete tasks
- Task filtering
- Pagination
- Responsive UI with Tailwind CSS

---

## Tech Stack

- **Backend:** Django, Django REST Framework
- **Frontend:** React, Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios (or Fetch API)

---

## Prerequisites

Make sure you have the following installed:

- Python 3.9+
- Node.js 18+ and npm/yarn

---

## Setup

### Backend (Django)

1. Navigate to the backend folder:

```bash
cd backend
```

- On macOS/Linux
```bash
python -m venv venv
source venv/bin/activate
```

- On windows
```bash
python -m venv venv
venv\Scripts\activate
```


- install dependencies
```bash
pip install -r requirements.txt
```

- apply migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

- run server
```bash
python manage.py runserver
```

### Frontend (React + Vite)

```bash
cd client
```

- install dependencies
```bash
npm install
```

- run client
```bash
npm run dev
```