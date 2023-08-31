import express from "express";
import Contact from "../models/contact.model.js";
const router = express.Router();

//Post Method
router.post("/createcontact", async (req, res) => {
  const data = new Contact({
    contact_name: req.body.contact_name,
    contact_number: req.body.contact_number,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
