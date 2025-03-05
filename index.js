const express = require("express");
const morgan = require("morgan")
const cors = require("cors")


const app = new express();;
var PORT = 4000;
app.use(cors());
app.use(morgan('dev'))
const blogModel=require('./model')
require('./connection')
require('dotenv').config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/create', async (req, res) => {
  try {
      const item = req.body;
      const data = new blogModel(item);
      await data.save();
      res.status(201).json({ message: 'Blog post added successfully!', blog: data });
  } catch (error) {
      console.error('Error adding blog:', error);
      res.status(500).json({ message: 'Post Unsuccessful. Please try again later.' });
  }
});

app.get('/blogs',async (req, res) => {
  try {
      const data = await blogModel.find();
      res.status(200).send(data);
  } catch (error) {
      res.status(404).send('Data not found');
  }
});

app.put('/update/:id', async (req, res) => {
  try {
      await blogModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send({message:'updated successfully'})
  } catch (error) {
       console.error(error);
      res.status(400).send({message:'Error updating blog'});
   }
});

app.delete('/delete/:id',async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    if (blog) {
      res.status(200).json({ message: 'Blog deleted successfully' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting blog' });
  }
});





app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
