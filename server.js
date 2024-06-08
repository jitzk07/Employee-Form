const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


mongoose.connect('mongodb+srv://jitzk07:Jiten123@cluster0.vlhpd3i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
});

const Employee = mongoose.model('Employee', employeeSchema);


app.use(bodyParser.json());
app.use(cors());


app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
