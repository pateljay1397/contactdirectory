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
    contact_isFavorite,
  } = req.body;
  const data = new Contact({
    contact_id,
    contact_name,
    contact_number,
    contact_email,
    contact_isFavorite,
  });

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

// PUT Method - Update a contact
router.patch("/updatecontact", async (req, res) => {
  const {
    contact_id,
    contact_name,
    contact_number,
    contact_email,
    contact_isFavorite,
  } = req.body;

  try {
    // Find the contact by ID and update the fields
    const updatedContact = await Contact.findOneAndUpdate(
      { contact_id: contact_id },
      {
        contact_name,
        contact_number,
        contact_email,
        contact_isFavorite,
      },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      // If contact is not found, respond with an error
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a contact by ID
router.delete("/deletecontact/:id", async (req, res) => {
  const contactId = req.params.id;

  try {
    // Find the contact by ID and delete it
    const deletedContact = await Contact.findOneAndDelete({
      contact_id: contactId,
    });

    if (!deletedContact) {
      // If contact is not found, respond with an error
      return res
        .status(404)
        .json({ status: "failure", msg: "Contact not found" });
    }

    res.json({ status: "success", msg: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failure", msg: error.message });
  }
});

export default router;
