import React from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export default function PageOne({
  fields,
  values,
  handleChange,
  touched,
  errors,
}) {
  return (
    <React.Fragment>
      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name *</Form.Label>
        <Form.Control
          placeholder="Full name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          isValid={touched.name && !errors.name}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridGender">
        <Form.Label>Gender *</Form.Label>
        <Form.Control
          as="select"
          name="gender"
          onChange={handleChange}
          value={values.gender}
          isValid={touched.gender && !errors.gender}
          isInvalid={!!errors.gender}
        >
          <option value="">Choose gender...</option>
          {fields.gender.options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.gender}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAge">
        <Form.Label>Age *</Form.Label>
        <Form.Control
          placeholder="eg: 25"
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
          isValid={touched.age && !errors.age}
          isInvalid={!!errors.age}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.age}
        </Form.Control.Feedback>
      </Form.Group>
    </React.Fragment>
  );
}

PageOne.propTypes = {
  fields: PropTypes.object.isRequired,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
};

PageOne.defaultProps = {
  fields: {},
};
