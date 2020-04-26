import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import {
  getUsers,
  editUserRole,
  getNextPreviousUsers,
  deleteUser
} from "../../actions/users";

export default function ManageUsers() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const [editUser, seteditUser] = useState();
  const [modalState, setmodalState] = useState(false);
  const [userRole, setuserRole] = useState(3);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const onSubmit = e => {
    console.log(" the user role is " + userRole);
    e.preventDefault();
    let submit = {
      id: editUser.id
    };
    if (userRole === "1") {
      submit = {
        ...submit,
        is_moderator: false,
        is_administrator: true
      };
    } else if (userRole === "2") {
      submit = {
        ...submit,
        is_moderator: true,
        is_administrator: false
      };
    } else {
      submit = {
        ...submit,
        is_moderator: false,
        is_administrator: false
      };
    }
    console.log(submit);
    dispatch(editUserRole(editUser.id, submit));
    setmodalState(!modalState);
  };
  const setEdit = (userInfo, selection) => {
    setuserRole(selection);
    seteditUser(userInfo);
    setmodalState(!modalState);
  };
  const toggle = () => {
    setmodalState(!modalState);
  };

  return (
    <div className="container">
      <PrevNext next={users.next} previous={users.previous} />
      <ViewUsers
        users={users.results}
        onSubmit={onSubmit}
        setEdit={setEdit}
        modalState={modalState}
        toggle={toggle}
        userRole={userRole}
        setuserRole={setuserRole}
      />
    </div>
  );
}

const PrevNext = props => {
  const dispatch = useDispatch();
  return (
    <>
      {props.previous ? (
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(getNextPreviousUsers(props.previous))}
        >
          Previous
        </button>
      ) : (
        ""
      )}
      {props.next ? (
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(getNextPreviousUsers(props.next))}
        >
          Next
        </button>
      ) : (
        ""
      )}
    </>
  );
};

const ViewUsers = props => {
  const dispatch = useDispatch();
  return (
    <table className="table table-bordered">
      <tbody>
        {props.users &&
          props.users.map((user, index) => {
            let userRole = "";
            let selection = 3;
            if (user.is_administrator) {
              userRole = <strong>Administrator</strong>;
              selection = 1;
            } else if (user.is_moderator) {
              userRole = <strong>Moderator</strong>;
              selection = 2;
            }
            return (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{userRole}</td>
                <td>
                  <button
                    onClick={() => props.setEdit(user, selection)}
                    className="btn btn-success"
                  >
                    Edit Role
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="btn btn-danger"
                  >
                    Delete user
                  </button>
                </td>
                <td>
                  <EditUserRole
                    user={user}
                    onSubmit={props.onSubmit}
                    index={index}
                    toggle={props.toggle}
                    modalState={props.modalState}
                    userRole={props.userRole}
                    setuserRole={props.setuserRole}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const EditUserRole = props => {
  const buttonStyle = {
    float: "right"
  };
  const labelStyle = {
    marginRight: "10px"
  };
  console.log(props.userRole);
  return (
    <>
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}>
          {" "}
          Changing Role for {props.user.username}{" "}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={props.onSubmit}>
            <FormGroup>
              <Label style={labelStyle} for="category">
                Select Role
              </Label>
              <select
                name="Role"
                value={props.userRole}
                onChange={e => props.setuserRole(e.target.value)}
              // value={props.userForm.category}
              // onChange={e =>
              //   props.setuserForm({
              //     ...props.userForm,
              //     category: e.target.value
              //   })
              // }
              >
                <option value="1">Administrator</option>
                <option value="2">Moderator</option>
                <option value="3">None </option>
              </select>
            </FormGroup>
            <Button style={buttonStyle} color="success">
              Save
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
