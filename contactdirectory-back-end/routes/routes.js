import express from "express";
import Contact from "../models/contact.model.js";
const router = express.Router();

//Post Method
router.post("/createcontact", async (req, res) => {
  const {
    contact_id,
    contact_name,
    contact_number,
    contact_email,
    contact_isfavorite,
  } = req.body;
  const data = new Contact({
    contact_id,
    contact_name,
    contact_number,
    contact_email,
    contact_isfavorite,
  });

  // // Check if the contact already exists
  // const existingContact = await Contact.findOne({ name, email, phone });

  // if (existingContact) {
  //   return res.status(400).json({ error: "Contact already exists" });
  // }

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get Method
router.get("/getcontacts", async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
