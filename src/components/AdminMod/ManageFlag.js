import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlaggedPins,
  getNextFlaggedPins,
  deletePins,
} from "../../actions/pins";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
function ManageFlag() {
  const [showReport, setshowReport] = useState("");
  const flaggedPins = useSelector((state) => state.pins.flaggedPins);
  const dispatch = useDispatch(); // dispatches the action

  useEffect(() => {
    //similar to component did mount
    dispatch(getFlaggedPins());
  }, []);
  const toggleReports = (id) => {
    setshowReport((prevshowReport) => ({
      ...showReport,
      [id]: !prevshowReport[id],
    }));
  };
  const adminDelete = (id) => {
    dispatch(deletePins(id));
  };
  const auth = useSelector((state) => state.auth);

  const { isAuthenticated, user } = auth;

  return (
    <div>
      MANAGE THE FLAG
      <div className="container">
        <PrevNext next={flaggedPins.next} previous={flaggedPins.previous} />
        {flaggedPins.results && (
          <ListFlags
            pins={flaggedPins.results}
            handleDelete={adminDelete}
            toggleReports={toggleReports}
            showReport={showReport}
          />
        )}
      </div>
    </div>
  );
}

export default ManageFlag;

const PrevNext = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      {props.previous ? (
        <button
          onClick={() => dispatch(getNextFlaggedPins(props.previous))}
          className="btn btn-outline-primary"
        >
          Previous{" "}
        </button>
      ) : (
        ""
      )}
      {props.next ? (
        <button
          onClick={() => dispatch(getNextFlaggedPins(props.next))}
          className="btn btn-outline-primary"
        >
          Next
        </button>
      ) : (
        ""
      )}
    </>
  );
};

function ListFlags(props) {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <table className="table table-bordered">
        <tbody>
          {props.pins.map((pin, index) => {
            return (
              <tr key={index}>
                <td>{pin.title}</td>
                <td>{pin.username ? pin.username : "Anon"}</td>
                <td>{pin.flagscore} flags</td>
                <td>
                  <button
                    onClick={() => dispatch(deletePins(pin.id))}
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
                    ? pin.flaggerstory && (
                        <StoryReports reports={pin.flaggerstory} />
                      )
                    : null}
                </td>
                <td>
                  <Link to={`/Story/${pin.id}`}>View Story</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const StoryReports = (props) => {
  console.log(props);
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
