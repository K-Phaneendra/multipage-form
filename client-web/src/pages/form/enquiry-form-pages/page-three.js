import React from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export default function PageThree({
  fields,
  values,
  handleChange,
  touched,
  errors,
}) {
  return (
    <React.Fragment>
      <Form.Group className="mb-3" controlId="formGridHowDidYouFindUs">
        <Form.Label>How did you find us ?</Form.Label>
        <Form.Control
          as="select"
          name="how-did-you-find-us"
          onChange={handleChange}
          value={values["how-did-you-find-us"]}
          isValid={
            touched["how-did-you-find-us"] && !errors["how-did-you-find-us"]
          }
          isInvalid={!!errors["how-did-you-find-us"]}
        >
          <option>Choose...</option>
          {fields["how-did-you-find-us"].options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors["how-did-you-find-us"]}
        </Form.Control.Feedback>
      </Form.Group>

      {/* show or hide a textarea based on selection */}

      {values["how-did-you-find-us"] === "custom-input" && (
        <Form.Group className="mb-3" controlId="formGridHowDidYouFindUsCustom">
          <Form.Label>How did you find us ? (custom input) *</Form.Label>
          <Form.Control
            placeholder="Tell how did you find us"
            as="textarea"
            name="how-did-you-find-us-custom"
            value={values["how-did-you-find-us-custom"]}
            onChange={handleChange}
            isValid={
              touched["how-did-you-find-us-custom"] &&
              !errors["how-did-you-find-us-custom"]
            }
            isInvalid={!!errors["how-did-you-find-us-custom"]}
          />
          <Form.Control.Feedback type="invalid">
            {errors["how-did-you-find-us-custom"] &&
              "Please tell us, how did you find us ?"}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    </React.Fragment>
  );
}

PageThree.propTypes = {
  fields: PropTypes.object.isRequired,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
};

PageThree.defaultProps = {
  fields: {},
};
