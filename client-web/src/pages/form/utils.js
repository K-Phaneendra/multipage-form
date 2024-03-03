import * as yup from "yup";

export const customFieldKey = (key) => {
  return `${key}-custom`;
};

const checkIfFieldHasCustomOption = (field) => {
  const customInputOptionFinderKey = "option-custom-input";
  /* if custom field key is present on the field, then add custom fields to initial values */
  if (field[customInputOptionFinderKey]) {
    return true;
  } else {
    return false;
  }
};

export const generateSchemaConfiguration = (field) => {
  const limit = field.validation.limit;
  switch (field.validation["data-type"]) {
    case "number":
      if (field.required) {
        return yup.number().min(0).max(limit).required();
      } else {
        return yup.number().min(0).max(limit);
      }
    case "string":
      if (field.required) {
        return yup
          .string()
          .max(limit, `Cannot exceed ${limit} characters`)
          .required();
      } else {
        return yup.string().max(limit, `Cannot exceed ${limit} characters`);
      }
  }
};

export function generateFormikSchema(formConfig) {
  const schema = {};
  const initialValues = {};
  formConfig.pages.forEach((page) => {
    Object.keys(page.fields).forEach((key) => {
      const eachField = page.fields[key];
      schema[key] = generateSchemaConfiguration(eachField);
      initialValues[key] = "";
      if (checkIfFieldHasCustomOption(eachField)) {
        schema[customFieldKey(key)] = generateSchemaConfiguration(eachField);
        initialValues[customFieldKey(key)] = "";
      }
    });
  });
  return { schema, initialValues };
}

const isFormEmpty = (ref) => {
  let formIsEmpty = true;
  const allValues = Object.values(ref.current.values);
  allValues.forEach((value) => {
    if (value.length > 0) {
      formIsEmpty = false;
    } else {
      // form is empty
    }
  });
  return formIsEmpty;
};

export const isFormPageValid = (page, ref) => {
  const checks = {
    isRefValid: false,
    // isFormTouched: false,
    isFormEmpty: true,
    hasErrorOnPage: true,
  };
  let isValid = false;
  const errorKeys = [];
  // const fields = {}

  const checkAndAttachErorrKeys = (key) => {
    if (ref.current.errors.hasOwnProperty(key)) {
      // error exists on the field
      errorKeys.push(key);
    } else {
      // error does not exist on the field
    }
  };

  if (ref.current) {
    checks.isRefValid = true;
    checks.isFormEmpty = isFormEmpty(ref);
    if (!isFormEmpty(ref)) {
      // run the below code only if the form is touched
      Object.keys(page.fields).forEach((key) => {
        const eachField = page.fields[key];
        // check if there are any errors with the field key
        checkAndAttachErorrKeys(key);
        if (checkIfFieldHasCustomOption(eachField)) {
          const customKey = customFieldKey(key);
          checkAndAttachErorrKeys(customKey);
        }
      });
    } else {
      // form is empty
    }
    checks.hasErrorOnPage = errorKeys.length > 0 ? true : false;
  } else {
    // ref is not valid
    checks.isRefValid = false;
  }
  // check if all checks are passed and then return the value from function
  if (checks.isRefValid && !checks.isFormEmpty && !checks.hasErrorOnPage) {
    isValid = true;
  } else {
    isValid = false;
  }
  return isValid;
};
