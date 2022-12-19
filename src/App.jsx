import React from "react";
// After installing Formik amd yup, Import Here
import { useFormik } from "formik";
// import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import * as yup from "yup";
// import { string } from "yup/lib/locale";


/*-------------Normal Way of using without Validation Schema*/


// const validate = (values) => {
//   var errors = {};
//   if (!values.name) {
//     errors.name = "Give Name !! ";
//   }
//   else if (values.name.length>10)
//   {
//     errors.name = "Max char 10 only";
//     }
//     else if (values.name.length<2)
//   {
//     errors.name = "Min char 2 only";
//     }

//   return errors;
// };




const App = () => {


  // Initial values for the form using Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      list: "",
      password: "",
      confirmpassword: "",
    },
    /*validatio happens Here.yup.object({})-> Method which has Object*/
    /*OBJECT again has Key value pairs, YUP has multiple methods in it */ 
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Must give Name")
        .strict()
        .trim()
        .min(2, "Min 2 char")
        .max(10, "Max 10 chars"),

      email: yup.string().email().required("Please Give Email"),
      list: yup.string().required("Select some option "),
      password: yup.string().required().min(8, "Should be 8 in length"),
      confirmpassword: yup.string().required().oneOf([yup.ref('password')],'SHOULD MATCH PASSWORD FIELD!!'),
    }),

    /*Validation schema checks for Error, if TRUE display error message, ELSE onsubmit will run and show input data*/

    onSubmit: (inputData) => {
      console.log(inputData);
    },
  });

  return (
    <div className="container">
      <h1>FORM VALIDATION</h1>
      <div className="jumbotron">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Name : </label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          {formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}

          {/* ------------EMAIL---------------- */}
          <label>Email : </label>
          <input
            className="form-control"
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          {formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}

          {/* ------------SELECT OPTION-------------- */}
          <div className="form-group">
            <label> SELECT OPTION : </label>
            <select
              className="form-control"
              name="list"
              id="1"
              onChange={formik.handleChange}
              value={formik.values.list}
            >
              <option value="">SELECT</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            {formik.errors.list ? (
              <div className="text-danger">{formik.errors.list}</div>
            ) : null}
          </div>

          {/* ------------Password---------------- */}
          <label>Password : </label>
          <input
            className="form-control"
            type="text"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          {formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}

          {/* ------------Confirm Password---------------- */}
          <label>Confirm Password : </label>
          <input
            className="form-control"
            type="text"
            name="confirmpassword"
            onChange={formik.handleChange}
            value={formik.values.confirmpassword}
          />

          {formik.errors.confirmpassword ? (
            <div className="text-danger">{formik.errors.confirmpassword}</div>
          ) : null}
        </div>

        <button className="btn btn-primary"> SUBMIT</button>
        </form>
      </div>
        
    </div>
  );
};

export default App;
