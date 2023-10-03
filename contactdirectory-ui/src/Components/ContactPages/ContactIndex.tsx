import { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import AddContact from "./AddContact";
import axios from "axios";
// import AddRandomContact from "./AddRandomContact";
// import FavoriteContacts from "./FavoriteContacts";
// import GeneralContacts from "./GeneralContacts";
// import RemoveAllContact from "./RemoveAllContact";

export type Contact = {
  contact_id: number;
  contact_name: String;
  contact_number: number;
  contact_email: String;
  contact_isFavorite?: Boolean;
};

const ContactIndex = () => {
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [isUpdating, setIsUpdating] = useState<Boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    undefined
  );
  const [contacts, setContacts] = useState<Contact[] | undefined>();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getcontacts")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setContacts(response.data);
        } else {
          console.error("Error adding contact");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleAddContact = (newContact: Contact) => {
    if (newContact.contact_name === "") {
      return { status: "failure", msg: "Please Enter a valid Name" };
    } else if (!newContact.contact_number) {
      return { status: "failure", msg: "Please Enter a valid Phone Number" };
    }
    const duplicateRecord = contacts!.filter((x) => {
      if (
        x.contact_email === newContact.contact_email &&
        x.contact_number === newContact.contact_number
      ) {
        return true;
      } else return false;
    });
    if (duplicateRecord.length > 0) {
      return { status: "failure", msg: "Duplicate Record" };
    } else {
      const response = axios
        .post("http://localhost:8080/api/createcontact", {
          contact_id: Math.floor(Math.random() * 100),
          contact_email: newContact.contact_email,
          contact_isfavorite: false,
          contact_name: newContact.contact_name,
          contact_number: newContact.contact_number,
        })
        .then((response) => {
          console.log("Adding contact response", response);
          if (response.status === 200) {
            return { status: "success", msg: "Contact was added successfully" };
            // console.log("Contact added successfully");
          } else {
            console.error("Error adding contact");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return response;
      // contactList.push(newFinalContact);
      // setContactList(contactList);
    }
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    // if (updatedContact.name === "") {
    //   return { status: "failure", msg: "Please Enter a valid Name" };
    // } else if (!updatedContact.phone) {
    //   return { status: "failure", msg: "Please Enter a valid Phone Number" };
    // }

    // this.setState((prevState) => {
    //   return {
    //     contactList: prevState.contactList.map((obj: Contact) => {
    //       if (obj.id === updatedContact.id) {
    //         return {
    //           ...obj,
    //           name: updatedContact.name,
    //           email: updatedContact.email,
    //           phone: updatedContact.phone,
    //         };
    //       }
    //       return obj;
    //     }),
    //     isUpdating: false,
    //     selectedContact: undefined,
    //   };
    // });
    return { status: "success", msg: "Contact was updated successfully" };
  };

  // const handleToggleFavorites = (contact: Contact) => {
  //   // this.setState((prevState) => {
  //   //   return {
  //   //     contactList: prevState.contactList.map((obj: Contact) => {
  //   //       if (obj.id === contact.id) {
  //   //         return { ...obj, isFavorite: !obj.isFavorite };
  //   //       }
  //   //       return obj;
  //   //     }),
  //   //   };
  //   // });
  // };

  // const handleDeleteContact = (contactId: Number) => {
  //   // this.setState((prevState) => {
  //   //   return {
  //   //     contactList: prevState.contactList.filter((obj: Contact) => {
  //   //       return obj.id !== contactId;
  //   //     }),
  //   //   };
  //   // });
  // };

  // const handleAddRandomContact = (newContact: Contact) => {
  //   const newFinalContact = {
  //     ...newContact,
  //     id: 1,
  //     isFavorite: false,
  //   };
  //   // this.setState((prevState) => {
  //   //   return {
  //   //     contactList: prevState.contactList.concat([newFinalContact]),
  //   //   };
  //   // });
  // };

  // const handleRemoveAllContact = () => {
  //   setContactList([]);
  // };

  // const handleUpdateClick = (contact: Contact) => {
  //   setSelectedContact(contact);
  //   setIsUpdating(true);
  // };

  const handleCancelUpdateContact = () => {
    // setSelectedContact(undefined);
    // setIsUpdating(false);
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "85vh" }}>
        <div className="row py-3">
          <div className="row py-2">
            <div className="col-8 offset-2 row">
              <AddContact
                handleAddContact={handleAddContact}
                isUpdating={isUpdating}
                selectedContact={selectedContact}
                cancelUpdateContact={handleCancelUpdateContact()}
                handleUpdateContact={handleUpdateContact}
              />
            </div>
          </div>
        </div>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact No</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {contacts ? (
                contacts.map((contact: Contact, id: number) => {
                  return (
                    <tr onClick={() => {}} key={id}>
                      <th scope="row">{id}</th>
                      <td>{contact.contact_name}</td>
                      <td>{contact.contact_email}</td>
                      <td>{contact.contact_number}</td>
                      <td>
                        <div></div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ContactIndex;
