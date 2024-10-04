/**const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'online_automobile'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add car route
app.get('/addcar', (req, res) => {
  res.sendFile(path.join(__dirname, 'addform.html'));
});

app.post('/addcar', upload.single('image'), (req, res) => {
  const { brand, model, year, price, mileage, fuelType, location } = req.body;
  const image = req.file ? req.file.buffer : null;

  const sql = 'INSERT INTO car (brand, model, year, price, mileage, fuel_type, location, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [brand, model, year, price, mileage, fuelType, location, image], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding car.');
    } else {
      console.log('Car added successfully.');
      res.status(200).send('Car added successfully.');
    }
  });
});

// Cars route with filters
app.get('/cars', (req, res) => {
  const { model, minPrice, maxPrice, location } = req.query;
  let sql = 'SELECT * FROM car WHERE 1=1';

  if (model) {
    sql += ` AND model LIKE '%${model}%'`;
  }

  if (minPrice) {
    sql += ` AND price >= ${minPrice}`;
  }

  if (maxPrice) {
    sql += ` AND price <= ${maxPrice}`;
  }

  if (location) {
    sql += ` AND location LIKE '%${location}%'`;
  }

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.send('Error fetching cars.');
    } else {
      res.render('cars', { cars: results });
    }
  });
});

// Serve buyer form
app.get('/buyer_form', (req, res) => {
  const carId = req.query.carId;
  res.render('buyer_form', { carId });
});

// Nodemailer transporter setup
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tamilarasip.22cse@kongu.edu', // Your Gmail email address
    pass: 'andx xznk qhsn aagi' // Your Gmail password
  }
});

// Function to send email
/**function sendEmail(toEmail) {
  let mailOptions = {
    from: 'your_email@gmail.com',
    to: toEmail,
    subject: 'Thank you for your submission',
    text: 'Your information has been successfully submitted. Thank you for your interest!'
  };
   const mailOptions = {
    from: email, // Sender email address (from the appointment form)
    to: recipientEmail, // Recipient email address based on the specified hospital name
    subject: 'Thank you for your submission',
    text: 'Your information has been successfully submitted. Thank you for your interest!'
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Buyer information submission route
app.post('/submitbuyerinfo', (req, res) => {
  const { name, email, mobile, location, carId } = req.body;

  // Validate input data
  if (!name || !email || !mobile || !location) {
    res.status(400).send('All fields are required.');
    return;
  }

  // Insert buyer information into the database
  const sql = 'INSERT INTO users (name, email, mobile, location, car_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, mobile, location, carId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error submitting buyer information.');
    } else {
      console.log('Your information submitted successfully!');
      sendEmail(email); // Send email to the buyer
      res.status(200).send('Your information submitted successfully!');
    }
  });
});

// Start the server
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}**/
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sivadeep_45',
  database: 'online_automobile'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected');
});

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('Public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add car route
app.get('/addcar', (req, res) => {
  console.log('Serving add car form');
  res.sendFile(path.join(__dirname, 'addform.html'));
});

app.get('/addform', (req, res) => {
  console.log('Serving add car form');
  res.sendFile(path.join(__dirname, 'addform.html'));
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

app.post('/addcar', upload.single('image'), (req, res) => {
  const { brand, model, year, price, mileage, fuelType, location } = req.body;
  const image = req.file ? req.file.buffer : null;
  console.log('Received new car data:', { brand, model, year, price, mileage, fuelType, location });

  const sql = 'INSERT INTO Cars (brand, model, year, price, mileage, fuel_type, location, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [brand, model, year, price, mileage, fuelType, location, image], (err, result) => {
    if (err) {
      console.error('Error adding car:', err);
      res.status(500).send('Error adding car.');
    } else {
      console.log('Car added successfully:', result);
      res.status(200).send('Car added successfully.');
    }
  });
});

// Cars route with filters
app.get('/cars', (req, res) => {
  const { model, minPrice, maxPrice, location } = req.query;
  /* console.log('Received filter query:', { model, minPrice, maxPrice, location }); */
  
  let sql = 'SELECT * FROM Cars WHERE 1=1';

  if (model) {
    sql += ` AND model LIKE '%${model}%'`;
    console.log('Filtering by model:', model);
  }

  if (minPrice) {
    sql += ` AND price >= ${minPrice}`;
    console.log('Filtering by minimum price:', minPrice);
  }

  if (maxPrice) {
    sql += ` AND price <= ${maxPrice}`;
    console.log('Filtering by maximum price:', maxPrice);
  }

  if (location) {
    sql += ` AND location LIKE '%${location}%'`;
    console.log('Filtering by location:', location);
  }

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching cars:', err);
      res.send('Error fetching cars.');
    } else {
      console.log('Fetched cars:', results);
      res.render('cars', { cars: results });
    }
  });
});

// Serve buyer form
app.get('/buyer_form', (req, res) => {
  const carId = req.query.carId;
  console.log('Serving buyer form for car ID:', carId);
  res.render('buyer_form', { carId });
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tamilarasip.22cse@kongu.edu',
    pass: 'vucv maos hzom bmkq' // Your Gmail app-specific password
  },
  port: 587, // Use 587 instead of 465
  secure: false, // false for port 587
  tls: {
    rejectUnauthorized: false
  }
});

// Function to send email
function sendEmail(toEmail) {
  const mailOptions = {
    from: 'tamilarasip.22cse@kongu.edu',
    to: toEmail,
    subject: 'Thank you for your submission',
    text: 'Your information has been successfully submitted. Thank you for your interest!'
  };

  console.log('Sending email to:', toEmail);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred while sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
}

// Buyer information submission route
app.post('/submitbuyerinfo', (req, res) => {
  const { name, email, mobile, location, carId } = req.body;
  console.log('Received buyer information:', { name, email, mobile, location, carId });

  // Validate input data
  if (!name || !email || !mobile || !location) {
    console.error('Validation error: All fields are required.');
    res.status(400).send('All fields are required.');
    return;
  }

  // Insert buyer information into the database
  const sql = 'INSERT INTO users (name, email, mobile, location, car_id) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, mobile, location, carId], (err, result) => {
    if (err) {
      console.error('Error submitting buyer information:', err);
      res.status(500).send('Error submitting buyer information.');
    } else {
      console.log('Buyer information submitted successfully:', result);
      sendEmail(email); // Send email to the buyer
      res.status(200).send('Your information submitted successfully!');
    }
  });
});





app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const options = {
      root: path.join(__dirname, 'public/images'),
      headers: {
          'Content-Type': 'image/jpeg',
      },
  };

  res.sendFile(imageName, options, (err) => {
      if (err) {
          res.status(err.status).end();
      } else {
          console.log('Sent:', imageName);
      }
  });
});









app.post('/register', (req, res) => {
  const { username, email, password, phone, location } = req.body;

  // Check if user already exists
  const checkUserSql = 'SELECT * FROM user WHERE email = ?';
  db.query(checkUserSql, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.status(400).send('User already exists.');
    } else {
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert new user into database
      const sql = 'INSERT INTO user (username, email, password, phone, location) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [username, email, hashedPassword, phone, location], (err, result) => {
        if (err) {
          console.error('Error inserting user into database:', err);
          res.status(500).send('Error registering user.');
        } else {
          console.log('User registered successfully:', result);
          res.status(200).send('Registration successful!');
        }
      });
    }
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const sql = 'SELECT * FROM user WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(400).send('User not found.');
    } else {
      const user = result[0];

      // Compare password
      if (bcrypt.compareSync(password, user.password)) {
        res.status(200).send('Login successful!');
      } else {
        res.status(400).send('Incorrect password.');
      }
    }
  });
});



// Start the server
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}
