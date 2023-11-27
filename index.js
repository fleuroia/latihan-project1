const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = ['Belajar Express.js', 'Membuat to-do list', 'Menyelesaikan proyek'];

app.get('/', (req, res) => {
  res.send('Ini adalah halaman utama.');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body.task;
  if (!newTask) {
    return res.status(400).json({ message: 'Input tidak valid' });
  }
  tasks.push(newTask);
  res.json({ message: 'Task berhasil ditambahkan', task: newTask });
});

app.put('/tasks/:index', (req, res) => {
  const index = req.params.index;
  const updatedTask = req.body.task;
  if (index >= 0 && index < tasks.length) {
    if (!updatedTask) {
      return res.status(400).json({ message: 'Input tidak valid' });
    }
    tasks[index] = updatedTask;
    res.json({ message: `Task dengan indeks ${index} berhasil diperbarui`, tasks });
  } else {
    res.status(404).json({ message: 'Indeks task tidak valid' });
  }
});

app.delete('/tasks/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: `Task dengan indeks ${index} berhasil dihapus`, tasks });
  } else {
    res.status(404).json({ message: 'Indeks task tidak valid' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

