import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManageComments() {
  const [flagComments, setflagComments] = useState("");
  const [showReport, setshowReport] = useState("");
  useEffect(() => {
    axios
      .get(`https://globaltraqsdev.com/api/`)
      .then((res) => {
        setflagComments(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleReports = (id) => {
    setshowReport((prevshowReport) => ({
      ...showReport,
      [id]: !prevshowReport[id],
    }));
  };
  const onDeleteComment = (id) => {
    axios
      .delete(`https://globaltraqsdev.com/api/${id}/`)
      .then((res) => {
        setflagComments(flagComments.filter((comment) => comment.id !== id));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {flagComments && (
        <DisplayComments
          comments={flagComments}
          onDelete={onDeleteComment}
          toggleReports={toggleReports}
          showReport={showReport}
        />
      )}
    </div>
  );
}

const DisplayComments = (props) => {
  return (
    <div className="container">
      <table className="table table-bordered">
        <tbody>
          {props.comments.map((pin) => {
            return (
              <tr key={pin.id}>
                <td>{pin.username ? pin.username : "Anon"}</td>
                <td>{pin.description}</td>
                <td>{pin.flagscore} flags</td>
                <td>
                  <button
                    onClick={() => onDelete(pind.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => props.toggleReports(pin.id)}
                    className="btn btn-danger"
                  >
                    Show Reports
                  </button>
                  {props.showReport[pin.id]
                    ? pin.flaggingComment && (
                        <CommentReports reports={pin.flaggingComment} />
                      )
                    : null}
                </td>
                <td>
                  <Link to={`/Story/${pin.pin.id}`}>View Story</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const CommentReports = (props) => {
  return (
    <ul>
      {props.reports.length > 0
        ? props.reports.map((report) => {
            return <li key={report.id}>{report.reason}</li>;
          })
        : "none"}
    </ul>
  );
};
