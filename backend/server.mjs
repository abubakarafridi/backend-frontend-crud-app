import express from 'express';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'abubakar', email: 'abubakar@gmail.com' },
  { id: 2, name: 'ahmad', email: 'ahmad@gmail.com' },
];

function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
    error: true,
  });
}

app.get('/api/users', (req, res) => {
  res.status(200).json({ message: 'Get Request - get all user', data:users });
});

app.post('/api/users', (req, res) => {
  const body = req.body;
  const newUser = { id: users.length + 1, ...body};
  users.push(newUser);
  res
    .status(201)
    .json({ message: 'Post Request - created a user', data: newUser });
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    res.status(200).json({
      message: `Update Request - The user with user id ${userId} is updated`,
      updatedUser,
    });
  } else {
    res
      .status(404)
      .json({ message: `The user with user id ${userId} is not found` });
  }
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({
      message: `Delete Request - The user with user id ${userId} is deleted`,
    });
  } else {
    res
      .status(404)
      .json({ message: `The user with user id ${userId} is not found` });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:3000`);
});