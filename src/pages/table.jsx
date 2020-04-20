import React, { useState, useEffect } from "react";
import axios from "axios";
import editIcon from "../images/edit.png";
import checkIcon from "../images/check.png";
import deleteIcon from "../images/delete.png";

const url = "http://localhost:3030/notifications";

const TableData = ({ goTo, Clicked, id }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await axios(url);
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (_id) => {
    axios.delete(`${url}/${_id}`);
    fetchData();
  };

  const handleEdit = (_id) => {
      goTo("editform");
      Clicked(true);
      id(_id);
  };

  const handleMark = (_id, status) => {
    axios.patch(`${url}/${_id}`, {
      status: "read",
    });
    fetchData();
  };

  return (
    <>
      <button className="u-pull-right" onClick={() => goTo("form")}>
        Add New Notification
      </button>
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              style={{ background: item.status === "unread" ? "#f1f1b1" : "" }}
            >
              <td>{item.select}</td>
              <td>{item.message}</td>
              <td>
                {item.status === "unread" && (
                  <img
                    src={checkIcon}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMark(item._id, item.status)}
                    className="icon-button"
                    title="mark as read"
                    alt=""
                  />
                )}
                <img
                  src={deleteIcon}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(item._id)}
                  className="icon-button"
                  title="delete Notification"
                  alt=""
                />
                <img
                  src={editIcon}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(item._id)}
                  className="icon-button"
                  title="edit Notification"
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableData;
