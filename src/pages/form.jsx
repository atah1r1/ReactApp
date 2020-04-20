import React, { useState } from "react";
import axios from "axios";

const url = "http://localhost:3030/notifications";

const Form = ({ goTo, editClicked, idf }) => {
  const [notification, setNotification] = useState({
    select: "",
    message: "",
    status: "unread",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (event) => {
    setNotification({
      ...notification,
      [name]: event.target.value,
    });
  };
  


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      axios.post(url, notification);
    } catch (error) {
      console.log("error");
    }
    setLoading(false);
    goTo("table");
  };
  return (
    <div>
      {loading && <h5>Sending data to server...</h5>}
      {!loading && (
        <>
          <div>
            <h5>Please Fill The Form:</h5>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                disabled={loading}
                value={notification.select}
                onChange={handleChange("select")}
                required
                className="u-full-width"
              ></input>
              <label>Message</label>
              <textarea
                disabled={loading}
                value={notification.message}
                onChange={handleChange("message")}
                required
                className="u-full-width"
                placeholder="Notification message"
              ></textarea>
              <button
                disabled={loading}
                className="button-primary u-pull-right"
                type="submit"
              >
                Submit
              </button>
              <button
                disabled={loading}
                className="cancel-btn button-primary u-pull-right"
                type="button"
                onClick={() => goTo("table")}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
