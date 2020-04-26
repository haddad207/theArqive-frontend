import React, { useState, useEffect } from "react";
import axios from "axios";
import { List } from "@material-ui/core";
import { LINK } from "../../link/link";

export default function ManageCategory() {
  const [category, setcategory] = useState("");
  const [categoryForm, setcategoryForm] = useState("");
  useEffect(() => {
    axios
      .get(`${LINK}/category`)
      .then((res) => {
        setcategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${LINK}/category/`, categoryForm)
      .then((response) => {
        const set = [...category, response.data];
        setcategoryForm(set);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateForm = (e) => {
    e.persist();
    setcategoryForm((categoryForm) => ({
      ...categoryForm,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      MANAGE THE FLAG
      <div className="container">
        {category && (
          <ListCategories
            category={category}
            categoryForm={categoryForm}
            onChange={updateForm}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

const ListCategories = (props) => {
  return (
    <table className="table table-bordered">
      <tbody>
        {props.category.map((categor) => {
          return (
            <tr key={categor.id}>
              <td>{categor.categoryName}</td>
              <td>
                <img src={categor.image_url} alt={categor.id} />{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
      <AddCategory {...props} />
    </table>
  );
};

const AddCategory = (props) => {
  console.log(props);
  return (
    <tr>
      <td>
        {" "}
        <input
          type="text"
          className="form-control-plaintext"
          id="category"
          name="categoryName"
          value={props.categoryForm.categoryName || ""}
          onChange={props.onChange}
        />
      </td>
      <td>
        <button onClick={props.onSubmit}>Submit</button>
      </td>
    </tr>
  );
};
