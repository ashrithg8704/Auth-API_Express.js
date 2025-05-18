const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

const JWT_SECRET = 'mySecretKey';

app.use(express.json());

let users = [
  { userId: "1", username: "rahul123", password: "secret12", fullName: "Rahul Misala" },
  { userId: "2", username: "nithin456", password: "pass4567", fullName: "Nithin Reddy" },
  { userId: "3", username: "vijay837", password: "hello999", fullName: "Vijay Govind" },
  { userId: "4", username: "swamy777", password: "king888", fullName: "Swamy G" },
  { userId: "5", username: "ashrithdev", password: "web12345", fullName: "Ashrith Guttula" }
];

function generateToken(user) {
  const payload = {
    userId: user.userId,
    username: user.username,
    fullName: user.fullName
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

function validateUserInput(req, res, next) {
  const { username, password, fullName } = req.body;

  if (req.path === '/signup') {
    if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
      return res.status(400).json({ message: "Username must be alphanumeric and required." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }
    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({ message: "Full name is required." });
    }
  }

  if (req.path === '/signin') {
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
  }

  next();
}

app.post('/signup', validateUserInput, (req, res) => {
  const { username, password, fullName } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already taken.' });
  }

  const newUser = {
    userId: (users.length + 1).toString(),
    username,
    password,
    fullName
  };

  users.push(newUser);

  const token = generateToken(newUser);
  res.status(201).json({ token });
});

app.post('/signin', validateUserInput, (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const token = generateToken(user);
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log(`✅ Auth API running at http://localhost:${PORT}`);
});
