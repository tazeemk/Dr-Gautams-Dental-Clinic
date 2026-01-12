import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import User, { findOne } from './model/userModel';
import appointment_info, { findOne as _findOne, find } from './model/appointmentCheck';

require('dotenv').config({ path: './.env' });

const app = express();
app.use(cors());
app.use(json());

connect
  ('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.log(err.message);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// app.post('/dental-clinic/slot/', async (req, res) => {
//   try {
//     const user_date = await appointment_info.findOne({ date: req.body.date });
//     const user_time = await appointment_info.findOne({ time: req.body.time });

//     if (user_date) {
//       if (user_time) {
//         return res.status(401).json({ message: 'This slot is already Booked' });
//       }
//     }

//     const Appointment_info = new appointment_info({
//       date: req.body.date,
//       name: req.body.name,
//       email: req.body.email,
//       phone: req.body.phone,
//       time: req.body.time,
//     });

//     const userAppointment = await Appointment_info.save();
//     // -----||
//     if (userAppointment) {
//       console.log(req.body);
//       res.status(201).json({ message: 'successfully Make An Appointment' });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post('/dental-clinic/slot/', async (req, res) => {
  try {
    // Check if the slot is already booked
    const existingSlot = await _findOne({
      date: req.body.date,
      time: req.body.time,
    });

    if (existingSlot) {
      return res.status(401).json({ message: 'This slot is already booked' });
    }

    // Create the new appointment
    const newAppointment = new appointment_info({
      date: req.body.date,
      name: req.body.name,
      emawil: req.body.email,
      phone: req.body.phone,
      time: req.body.time,
    });

    // Save the new appointment
    const savedAppointment = await newAppointment.save();

    if (savedAppointment) {
      console.log(req.body);
      return res
        .status(201)
        .json({ message: 'Successfully made an appointment' });
        console.log('Appointment saved:', savedAppointment);
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'An error occurred while processing your request' });
  }
});

app.post('/register', async (req, res) => {
  console.log(req.body);

  let saltRounds = await genSalt(10);
  let hashedPassword = await hash(req.body.password, saltRounds);

  try {
    const userExist = await findOne({ email: req.body.email });
    if (userExist) {
      return res.status(401).json({ error: 'Email already Exist' });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: 'user registered successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/login_user', async (req, res) => {
  console.log(req.body);

  try {
    const user = await findOne({ email: req.body.email });

    if (!user)
      return res.json({ msg: 'Incorrect Email or Password', status: false });

    const isPasswordValid = await compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return res.json({ msg: 'Incorrect Password', status: false });

    delete user.password;
    if (user && isPasswordValid) {
      return res.status(201).json({ message: 'Login Successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/dental-clinic/user/profile', async (req, res) => {
  try {
    const Appointment_info = await find();
    res.send(Appointment_info);
  } catch (err) {
    console.log(err);
  }
});

app.get('/dental-clinic/admin-person', async (req, res) => {});

// app.use((req, res) => {
//   res.status(404).send('Page not Found');
// });

app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});
