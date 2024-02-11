const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'rasmlar');
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, uploadDir);
      }
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve static files from the 'public' directory
const publicDir = path.join(__dirname, 'public');
fs.mkdir(publicDir, { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }
});
app.use(express.static(publicDir));

// Handle form submission
app.post('/contact', upload.single('image'), (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const phoneNumber = req.body.phoneNumber;
  const amount = req.body.amount;
  const image = req.file;

  // Create an object with the form data
  const formData = {
    name,
    email,
    message,
    phoneNumber,
    amount,
    image: image ? image.filename : null
  };

  // Read the existing data from data.json file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    try {
      const jsonData = JSON.parse(data);

      // Check if the uploaded image has the same name as an existing image
      const existingImage = jsonData.find(item => item.image === formData.image);
      if (existingImage) {
        return res.status(400).send('Bu nomdagi rasm avval yuklangan. Boshqa rasm yuklash uchun boshqa nom kiriting.');
      }

      // Write the form data to data.json file
      jsonData.push(formData);
      fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});