import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import { CenteredRow } from "./form-utils";
import PageOne from "./enquiry-form-pages/page-one";
import { generateSchemaConfiguration } from "./utils";
import PageTwo from "./enquiry-form-pages/page-two";
import { submitEnquiryForm } from "./api";
import PageThree from "./enquiry-form-pages/page-three";

export default function FormPage({
  name,
  fields,
  pageNumber,
  enquiryFormRef,
  formSchema,
  initialValues,
  savedFormValues,
  saveCurrentFormValues,
}) {
  const [initialFormValues, setInitialFormValues] = useState(initialValues);
  const [initialSchema, setInitialSchema] = useState(formSchema);
  const [isReinitialised, setIsReinitialised] = useState(false);

  useEffect(() => {
    // form is reinitialised
    setIsReinitialised(true);
    return () => {
      setTimeout(() => setIsReinitialised(false), 500);
    };
  }, [initialFormValues]);

  const updateInitialValues = ({ newKey, action }) => {
    const newInitialValues = { ...initialFormValues };
    switch (action) {
      case "add":
        newInitialValues[newKey] = "";
        break;
      case "remove":
        delete newInitialValues[newKey];
        break;
    }
    setInitialFormValues(newInitialValues);
  };
  const updateInitialSchema = ({ newKey, action, field }) => {
    const newInitialSchema = { ...initialSchema };
    switch (action) {
      case "add":
        newInitialSchema[newKey] = generateSchemaConfiguration(field);
        break;
      case "remove":
        delete newInitialSchema[newKey];
        break;
    }
    setInitialSchema(newInitialSchema);
  };

  const schema = yup.object().shape(initialSchema);

  const renderPages = ({ values, handleChange, touched, errors }) => {
    switch (pageNumber) {
      case 1:
        return (
          <PageOne
            fields={fields}
            values={values}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />
        );

      case 2:
        return (
          <PageTwo
            fields={fields}
            values={values}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            updateInitialValues={updateInitialValues}
            updateInitialSchema={updateInitialSchema}
            saveCurrentFormValues={saveCurrentFormValues}
          />
        );

      case 3:
        return (
          <PageThree
            fields={fields}
            values={values}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />
        );
    }
  };
  return (
    <React.Fragment>
      <CenteredRow>
        <div className="pt-4">
          <h4>{name}</h4>
        </div>
      </CenteredRow>

      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          submitEnquiryForm(values);
        }}
        innerRef={enquiryFormRef}
        initialValues={initialFormValues}
        enableReinitialize
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => {
          if (isReinitialised) {
            Object.keys(savedFormValues).forEach((key) => {
              values[key] = savedFormValues[key];
            });
          }

          return (
            <Form id="enquiry-form" className="py-4" onSubmit={handleSubmit}>
              {renderPages({
                values,
                handleChange,
                touched,
                errors,
              })}
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

FormPage.propTypes = {
  name: PropTypes.string,
  fields: PropTypes.object.isRequired,
  pageNumber: PropTypes.number,
  enquiryFormRef: PropTypes.shape({ current: PropTypes.object }),
};

FormPage.defaultProps = {
  name: "page name",
  fields: {},
  pageNumber: 1,
};
