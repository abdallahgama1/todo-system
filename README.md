# 📝 Todo Management Backend (Interview Task)

---

## &#x20;Features

- User registration and login with secure JWT authentication.
- Protected routes with authentication middleware.
- CRUD operations for managing Todo tasks.
- Profile viewing and updating.
- MongoDB Atlas integration.
- Input validation and robust error handling.

---

## &#x20;Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Other Packages:** dotenv, cors, cookie-parser, body-parser

---

## 🛠️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following format:

```
PORT=3000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=development
```

4. **Run the server**

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## 📊 Environment Variables

| Variable     | Description                                 |
| ------------ | ------------------------------------------- |
| `PORT`       | Server port number                          |
| `MONGO_URI`  | MongoDB Atlas connection string             |
| `JWT_SECRET` | Secret key for JWT token signing            |
| `NODE_ENV`   | Server environment (development/production) |

---

## Available API Routes

### 🔐 Authentication Routes (`/api/auth`)

| Method | Route       | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register a new user |
| POST   | `/login`    | Login user          |
| POST   | `/logout`   | Logout user         |

---

### 👤 User Routes (`/api/user`)

| Method | Route | Description                     |
| ------ | ----- | ------------------------------- |
| GET    | `/`   | View user profile (Protected)   |
| PATCH  | `/`   | Update user profile (Protected) |

---

### 📝 Todo Routes (`/api/todos`)

| Method | Route         | Description                       |
| ------ | ------------- | --------------------------------- |
| GET    | `/`           | Get all todos (Protected)         |
| GET    | `/:id`        | Get single todo by ID (Protected) |
| POST   | `/`           | Create new todo (Protected)       |
| PATCH  | `/:id`        | Update todo (Protected)           |
| PATCH  | `/toggle/:id` | Toggle todo status (Protected)    |
| DELETE | `/:id`        | Delete todo (Protected)           |

---

## 🛡️ Authentication Flow

- After successful **registration** or **login**, a **JWT** token is generated.
- Token is stored in an **HTTP-only cookie**.
- All protected routes require a valid JWT.

---

## 📈 Testing the API

You can use tools like **Postman** or **Insomnia** to test the endpoints:

1. Register a new user using `POST /api/auth/register`
2. Login the user using `POST /api/auth/login`
3. Use returned cookies for authenticated requests to `/api/user` and `/api/todos`

---

---

Thank you for reviewing this project!
I look forward to discussing the design, code decisions, and potential improvements in the next stage of the interview.

