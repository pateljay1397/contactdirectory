import React, { useEffect, useRef, useState } from "react";

const AddContact = (props: any) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  useEffect(() => {}, [successMessage]);

  const handleCancel = () => {
    props.cancelUpdateContact();
  };

  const handleAddContactFormSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.elements.contactName.value.trim();
    const email = e.target.elements.contactEmail.value.trim();
    const phone = Number(e.target.elements.contactPhone.value.trim());
    const id = e.target.elements.contactId.value.trim();
    let response = undefined;
    if (props.isUpdating) {
      response = await props.handleUpdateContact({
        contact_name: name,
        contact_email: email,
        contact_number: phone,
        id: id,
      });
    } else {
      response = await props.handleAddContact({
        contact_name: name,
        contact_email: email,
        contact_number: phone,
      });
      console.log("Response Props", response);
    }
    if (response.status === "success") {
      console.log(response);
      setErrorMessage(undefined);
      setSuccessMessage(response.msg);
      if (formRef.current) {
        formRef.current.reset();
      }
    } else {
      setErrorMessage(response.msg);
      setSuccessMessage(undefined);
    }
  };
  return (
    <div className="border col-12 text-white p-2">
      <form
        onSubmit={handleAddContactFormSubmit}
        ref={formRef}
        className="contact-form"
      >
        <input
          hidden
          name="contactId"
          defaultValue={props.isUpdating ? props.selectedContact.id : ""}
        ></input>
        <div className="row p-2">
          <div className="col-12 text-white-50">
            {props.isUpdating ? "Update Contact" : "Add a new Contact"}
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              className="form-control form-control-sm"
              placeholder="Name..."
              name="contactName"
              defaultValue={props.isUpdating ? props.selectedContact.name : ""}
            ></input>
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              className="form-control form-control-sm"
              placeholder="Email..."
              name="contactEmail"
              defaultValue={props.isUpdating ? props.selectedContact.email : ""}
            ></input>
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              className="form-control form-control-sm"
              placeholder="Phone..."
              name="contactPhone"
              defaultValue={props.isUpdating ? props.selectedContact.phone : ""}
            ></input>
          </div>

          {errorMessage === undefined ? (
            <div></div>
          ) : (
            <div className="col-12 text-center text-danger">{errorMessage}</div>
          )}

          {successMessage === undefined ? (
            <div></div>
          ) : (
            <div className="col-12 text-center text-success">
              {successMessage}
            </div>
          )}

          <div
            className={`col-12 p-1 ${
              props.isUpdating ? "col-md-4 offset-md-2" : "col-md-6 offset-md-3"
            }`}
          >
            <button className="btn btn-primary btn-sm form-control">
              {props.isUpdating ? "Update" : "Create"}
            </button>
          </div>
          <div className="col-12 col-md-4 p-1">
            {props.isUpdating && (
              <button
                className="btn btn-secondary form-control btn-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddContact;
