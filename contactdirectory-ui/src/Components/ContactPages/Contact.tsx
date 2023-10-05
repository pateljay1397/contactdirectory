import { ContactType } from "./ContactIndex";

interface ContactComponent {
  selectedContact?: ContactType;
  contact: ContactType;
  favoriteClick: (contact: ContactType) => void;
  updateClick: (contact: ContactType) => void;
  deleteContact: (contactId: number) => void;
}

const Contact: React.FC<ContactComponent> = ({
  contact,
  favoriteClick,
  deleteContact,
  updateClick,
}) => {
  return (
    <div
      className="row p-md-2 mb-2"
      style={{
        borderRadius: "20px",
        border: "1px solid #555",
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
      }}
    >
      <div className="col-1 col-md-1 pt-2 pt-md-1">{contact.contact_id}</div>
      <div className="row col-2 col-md-1 pt-2 pt-md-1">
        <span className="h4">
          <img
            src={`https://ui-avatars.com/api/?name=${contact.contact_name}`}
            style={{ width: "80%" }}
            alt=""
          />
          {contact.contact_name}
        </span>
      </div>
      <div className="col-6 col-md-5 text-warning pt-0">
        <br />
        <div className="text-black-50">
          {contact.contact_email}
          <br />
          {contact.contact_number}
        </div>
      </div>
      <div className="col-2 col-md-2 pt-md-3">
        <button
          className={`btn btn-sm m-1 ${
            contact.contact_isFavorite ? "btn-warning" : "btn-outline-warning"
          }`}
          onClick={() => favoriteClick(contact)}
        >
          <i className="bi bi-star" style={{ fontSize: "1rem" }}></i>
        </button>
      </div>
      <div className="col-2 col-md-3 pt-md-3">
        <button className="btn btn-primary btn-sm m-1">
          <i
            className="bi bi-pencil-square"
            onClick={() => updateClick(contact)}
            style={{ fontSize: "1rem" }}
          ></i>
        </button>
        <button className="btn btn-danger btn-sm m-1">
          <i
            className="bi bi-trash-fill"
            onClick={() => deleteContact(contact.contact_id)}
            style={{ fontSize: "1rem" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Contact;
