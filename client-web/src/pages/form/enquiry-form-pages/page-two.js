import React from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { customFieldKey } from "../utils";

export default function PageTwo({
  fields,
  values,
  handleChange,
  touched,
  errors,
  updateInitialValues,
  updateInitialSchema,
  saveCurrentFormValues,
}) {
  const onChangeProfession = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "custom-input") {
      // add custom key to initial values
      updateInitialValues({
        newKey: customFieldKey("profession"),
        action: "add",
      });
      updateInitialSchema({
        newKey: customFieldKey("profession"),
        action: "add",
        field: fields.profession,
      });
    } else {
      // remove the custom key from initial values
      updateInitialValues({
        newKey: customFieldKey("profession"),
        action: "remove",
      });
      updateInitialSchema({
        newKey: customFieldKey("profession"),
        action: "remove",
        field: fields.profession,
      });
    }
    // save selected form values as the form will get re-initialized
    const formValues = { ...values };
    formValues.profession = selectedValue;
    saveCurrentFormValues(formValues);
    return handleChange(e);
  };
  return (
    <React.Fragment>
      <Form.Group className="mb-3" controlId="formGridProfession">
        <Form.Label>Profession *</Form.Label>
        <Form.Control
          as="select"
          name="profession"
          onChange={onChangeProfession}
          value={values.profession}
          isValid={touched.profession && !errors.profession}
          isInvalid={!!errors.profession}
        >
          <option value={""}>Choose profession...</option>
          {fields.profession.options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {errors.profession}
        </Form.Control.Feedback>
      </Form.Group>

      {/* show or hide a textarea based on selection */}

      {values.profession === "custom-input" && (
        <Form.Group className="mb-3" controlId="formGridProfessionCustom">
          <Form.Label>Profession (custom input) *</Form.Label>
          <Form.Control
            placeholder="your profession"
            as="textarea"
            name="profession-custom"
            value={values["profession-custom"]}
            onChange={handleChange}
            isValid={
              touched["profession-custom"] && !errors["profession-custom"]
            }
            isInvalid={!!errors["profession-custom"]}
          />
          <Form.Control.Feedback type="invalid">
            {errors["profession-custom"] && "Profession is a required field"}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="formGridServicesLookingFor">
        <Form.Label>Services looking for *</Form.Label>
        <Form.Control
          placeholder="services you are looking for"
          as="textarea"
          name="services-looking-for"
          value={values["services-looking-for"]}
          onChange={handleChange}
          isValid={
            touched["services-looking-for"] && !errors["services-looking-for"]
          }
          isInvalid={!!errors["services-looking-for"]}
        />
        <Form.Control.Feedback type="invalid">
          {errors["services-looking-for"] &&
            "Services looking for is a required field"}
        </Form.Control.Feedback>
      </Form.Group>
    </React.Fragment>
  );
}

PageTwo.propTypes = {
  fields: PropTypes.object.isRequired,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
  updateInitialValues: PropTypes.func,
  updateInitialSchema: PropTypes.func,
  saveCurrentFormValues: PropTypes.func,
};

PageTwo.defaultProps = {
  fields: {},
};
