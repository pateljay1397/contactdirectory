// dataSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  contact_id: number;
  contact_name: String;
  contact_number: number;
  contact_email: String;
  contact_isFavorite?: Boolean;
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

export const fetchContacts = createAsyncThunk<Contact[]>(
  "contacts/fetch",
  async () => {
    const response = await fetch("http://localhost:8080/api/getcontacts", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
);

export const createContact = createAsyncThunk<Contact, Contact>(
  "contacts/create",
  async (newContact) => {
    const response = await fetch("http://localhost:8080/api/createcontact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });
    const data = await response.json();
    return data;
  }
);

export const updateContact = createAsyncThunk<Contact, Contact>(
  "contacts/update",
  async (updatedContact) => {
    try {
      const response = await fetch("http://localhost:8080/api/updatecontact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContact),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update Contact Failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }
);

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (contactId: number, { rejectWithValue }) => {
    try {
      // Send a DELETE request to the API endpoint using fetch
      const response = await fetch(
        `http://localhost:8080/api/deletecontact/${contactId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // You can include additional headers or body if required
        }
      );

      if (!response.ok) {
        // Handle non-successful responses
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      // Handle network errors or exceptions
      return rejectWithValue({ message: "Network error" });
    }
  }
);

export const ContactDataSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactData: (state, action: PayloadAction<ContactsState>) => {
      return action.payload;
    },
    // Add other reducers as needed
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        // You may want to remove the deleted contact from your state
        state.contacts = state.contacts.filter(
          (contact) => contact.contact_id !== action.payload.id
        );
      });
  },
});

export const { setContactData } = ContactDataSlice.actions;
export default ContactDataSlice.reducer;
