const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/api/employees', async (req, res) => {
  try {
    const employee = await db.Employee.create(req.body);
    res.status(201).send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await db.Employee.findAll();
    res.status(200).send(employees);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update an employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id);
    if (employee) {
      await employee.update(req.body);
      res.status(200).send(employee);
    } else {
      res.status(404).send({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id);
    if (employee) {
      await employee.destroy();
      res.status(200).send({ message: 'Employee deleted' });
    } else {
      res.status(404).send({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
