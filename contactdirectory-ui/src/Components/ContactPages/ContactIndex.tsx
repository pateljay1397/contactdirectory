import { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import AddContact from "./AddContact";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "../../slices/contactDataSlice";
import Contact from "./Contact";
import UpdateContact from "./UpdateContact";
// import AddRandomContact from "./AddRandomContact";
// import FavoriteContacts from "./FavoriteContacts";
// import GeneralContacts from "./GeneralContacts";
// import RemoveAllContact from "./RemoveAllContact";

export type ContactType = {
  contact_id: number;
  contact_name: String;
  contact_number: number;
  contact_email: String;
  contact_isFavorite?: Boolean;
};

const ContactIndex = () => {
  const [isUpdating, setIsUpdating] = useState<Boolean>(false);
  const [selectedContact, setSelectedContact] = useState<
    ContactType | undefined
  >(undefined);
  const userContacts = useAppSelector((state) => state.contactData.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch, isUpdating]);

  const handleAddContact = async (newContact: ContactType) => {
    if (newContact.contact_name === "") {
      return { status: "failure", msg: "Please Enter a valid Name" };
    } else if (!newContact.contact_number) {
      return { status: "failure", msg: "Please Enter a valid Phone Number" };
    }
    const duplicateRecord = userContacts!.filter((x) => {
      if (
        x.contact_email === newContact.contact_email &&
        x.contact_number === newContact.contact_number
      ) {
        return true;
      } else return false;
    });
    if (duplicateRecord.length > 0) {
      return { status: "failure", msg: "Duplicate Record" };
    }

    try {
      const response = await dispatch(
        createContact({
          contact_id: Math.floor(Math.random() * 100),
          contact_email: newContact.contact_email,
          contact_isFavorite: false,
          contact_name: newContact.contact_name,
          contact_number: newContact.contact_number,
        })
      );

      console.log("Adding contact response", response);

      if (createContact.fulfilled.match(response)) {
        return response.payload;
      } else {
        return { status: "failure", msg: "Error adding contact" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { status: "failure", msg: "Error adding contact" };
    }
  };

  const handleUpdateContact = async (updatedContact: ContactType) => {
    console.log("Update Contact", updatedContact);
    if (updatedContact.contact_name === "") {
      return { status: "failure", msg: "Please Enter a valid Name" };
    } else if (!updatedContact.contact_number) {
      return { status: "failure", msg: "Please Enter a valid Phone Number" };
    }

    try {
      // Dispatch the updateContact async thunk
      const response = await dispatch(updateContact(updatedContact));

      // Check the status in the response and update the state accordingly
      if (updateContact.fulfilled.match(response)) {
        setIsUpdating(false);
        setSelectedContact(undefined);
        return {
          contactList: userContacts.map((obj: ContactType) => {
            if (obj.contact_id === updatedContact.contact_id) {
              return {
                ...obj,
                name: updatedContact.contact_name,
                email: updatedContact.contact_email,
                phone: updatedContact.contact_number,
              };
            }
            return obj;
          }),
        };
      } else {
        return { status: "failure", msg: "Error updating contact" };
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      return { status: "failure", msg: "Error updating contact" };
    }
  };

  const handleToggleFavorites = (contact: ContactType) => {
    // this.setState((prevState) => {
    //   return {
    //     contactList: prevState.contactList.map((obj: ContactType) => {
    //       if (obj.id === contact.id) {
    //         return { ...obj, isFavorite: !obj.isFavorite };
    //       }
    //       return obj;
    //     }),
    //   };
    // });
  };

  const handleDeleteContact = async (contactId: number) => {
    const response = await dispatch(deleteContact(contactId));
    console.log(response);
    if (response.payload.status === "success") await dispatch(fetchContacts());
  };

  // const handleRemoveAllContact = () => {
  //   setContactList([]);
  // };

  const handleUpdateClick = (contact: ContactType) => {
    setIsUpdating(true);
    setSelectedContact(contact);
  };

  const handleCancelUpdateContact = () => {
    setSelectedContact(undefined);
    setIsUpdating(false);
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "85vh" }}>
        <div className="row py-3">
          <div className="row py-2">
            <div className="col-8 offset-2 row">
              {!isUpdating ? (
                <AddContact handleAddContact={handleAddContact} />
              ) : (
                <UpdateContact
                  isUpdating={isUpdating}
                  selectedContact={selectedContact}
                  cancelUpdateContact={handleCancelUpdateContact}
                  handleUpdateContact={handleUpdateContact}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Favorite</th>
            <th scope="col">User Actions</th>
          </div>
          <div
            style={{ borderTop: "2px solid currentcolor", paddingTop: "5px" }}
          >
            {userContacts ? (
              userContacts.map((contact: ContactType, id: number) => {
                return (
                  <Contact
                    contact={contact}
                    favoriteClick={handleToggleFavorites}
                    deleteContact={handleDeleteContact}
                    updateClick={handleUpdateClick}
                    key={id}
                  />
                );
              })
            ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ContactIndex;
