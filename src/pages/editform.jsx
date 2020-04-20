import React from "react";
import axios from "axios";
import { useState } from 'react';
const url = "http://localhost:3030/notifications";

const EditForm = ({idf, goTo}) => {

   const [notification, setNotification] = useState({
        select: "",
        message: "",
        status: "unread",
      });

    const handleChange = (name) => (event) => {
    setNotification({
        ...notification,
        [name]: event.target.value,
    });
};

    const handleEdit = (event) => {
        event.preventDefault();
        axios.patch(`${url}/${idf}`, {
            select: notification.select,
            message: notification.message,
            _id: idf
          });
        goTo('table');
    }



  return (
    <div>
      <h5>Please Fill The Form:</h5>
      <form onSubmit={handleEdit}>
        <label>Name</label>
        <input type="text" onChange={handleChange("select")} value={notification.select} required className="u-full-width"></input>
        <label>Message</label>
        <textarea
          value={notification.message}
          onChange={handleChange("message")}
          required
          className="u-full-width"
          placeholder="Notification message"
        ></textarea>
        <button className="button-primary u-pull-right" type="submit">
          Submit
        </button>
        <button
          className="cancel-btn button-primary u-pull-right"
          type="button"
          onClick={() => goTo("table")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
