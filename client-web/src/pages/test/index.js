import { useEffect, useState } from "react";
import { Formik, FieldArray, useFormik } from "formik";
// import "./styles.css";

export default function Test() {
  const [test, setTest] = useState(null);
  const { values, errors, handleChange, setFieldValue } = useFormik({
    initialValues: {
      test: test,
      name: "",
      email: "",
      phone: ""
    }
  });

  useEffect(() => {
    setFieldValue("test", test);
  }, [test]);

  return (
    <>
      <button onClick={() => setTest("something" + Date.now())}>
        Update State
      </button>
      <br />
      <input
        placeholder="name"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="email"
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="phone"
        type="text"
        name="phone"
        value={values.phone}
        onChange={handleChange}
      />
      <>
        <pre style={{ textAlign: "left" }}>
          <strong>Values</strong>
          <br />
          {JSON.stringify(values, null, 2)}
        </pre>
        <pre style={{ textAlign: "left" }}>
          <strong>Errors</strong>
          <br />
          {JSON.stringify(errors, null, 2)}
        </pre>
      </>
    </>
  );
}
