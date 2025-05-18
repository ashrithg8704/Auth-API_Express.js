
# Express.js Assignment

## 🎯 Goal:

To build a simple yet robust authentication API using **Express.js** that includes:

- Input validation middleware
- In-memory user store (no DB)
- Signup and Signin routes
- JWT token generation with embedded user data

## 📋 Problem Statement :

> You're tasked with building a lightweight authentication system.
> 
> 
> This system should allow users to **sign up and sign in**, while ensuring:
> 
> - Only **valid user input** is accepted
> - Every **successful sign in or sign up** returns a secure **JWT token**
> - Token contains essential user data for future use
> 
> You will simulate a basic user database using an **array of predefined users**.
> 

---

## 🛠️ What to Build:

### 🧾 1. **Users Array**

Create an array with 5 predefined users.

Each user object should have the following properties:

```jsx
{
  userId: "1",
  username: "rahul123",
  password: "secret12",
  fullName: "Rahul misala"
}

```

---

### 🔐 2. **JWT Payload & Token**

Use `jsonwebtoken` to generate a JWT on both **signup** and **signin**.

✅ The token payload must include:

```jsx
{
  userId,
  username,
  fullName
}
```

✅ Sign the token with a **secret key**

---

### 🛣️ 3. **API Endpoints**

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/signup` | Add a new user, return token |
| POST | `/signin` | Authenticate user, return token |

---

### 🛡️ 4. **Input Validation Middleware**

Create a middleware called `validateUserInput(req, res, next)` that checks:

### For Signup:

- `username` is required and must be alphanumeric
- `password` is at least 6 characters
- `fullName` is not empty

### For Signin:

- `username` and `password` must not be empty

❌ If invalid, return `400 Bad Request` with a helpful message.

---

### 🔁 5. **Signup Logic**

- Check if the username is already taken (search the array).
- If yes → return `409 Conflict`.
- If no → push the new user to the array.
- Return a JWT with user details.

---

### 🔁 6. **Signin Logic**

- Check if the username exists and password matches.
- If yes → return a JWT.
- If not → return `401 Unauthorized`.

---

---

## 📌 Sample Token Response:

```json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}

```

---

---


## ✅ Final Notes:

- **No need for a database** (in-memory array only)
- **No need for hashing passwords** (keep it simple for now)
- **Focus on logic, validation, and token flow**
