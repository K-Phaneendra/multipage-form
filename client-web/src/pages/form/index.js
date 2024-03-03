import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import EmptyCard from "../../components/card/empty-card";
import PaginationCustom from "../../components/pagination";
import FormPage from "./form-page";
import { CenteredForm, CenteredRow } from "./form-utils";
import { fetchFormConfiguration } from "./api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { generateFormikSchema, isFormPageValid } from "./utils";
import Timer from "../../components/timer";
import Reset from "./reset";

export default function Form() {
  const enquiryFormRef = useRef();

  const [formConfig, setFormConfig] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [savedFormValues, setSavedFormValues] = useState({});
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [startTimer, setStartTimer] = useState(false);

  const getFormConfiguration = async () => {
    const fetchResponse = await fetchFormConfiguration();
    if (Object.keys(fetchResponse).length > 0) {
      setFormConfig(fetchResponse.form);
      setStartTimer(true);
    } else {
      setFormConfig({});
    }
  };

  useEffect(() => {
    getFormConfiguration();
  }, []);

  const renderFormPages = () => {
    const activePageIndex = activePage - 1;
    const page = formConfig.pages[activePageIndex];
    const { schema, initialValues } = generateFormikSchema(formConfig);
    return (
      <FormPage
        pageNumber={activePage}
        name={page.name}
        fields={page.fields}
        enquiryFormRef={enquiryFormRef}
        formSchema={schema}
        initialValues={initialValues}
        savedFormValues={savedFormValues}
        saveCurrentFormValues={setSavedFormValues}
      />
    );
  };

  const goToPreviousPage = () => {
    if (activePage === 1) {
      // already on the first page, hence do nothing
    } else {
      const selectedPage = activePage - 1;
      setActivePage(selectedPage);
    }
  };
  const navigateToNextPage = () => {
    const totalPageCount = formConfig.pages.length;
    if (activePage === totalPageCount) {
      // already on the last page, hence do nothing
    } else {
      const selectedPage = activePage + 1;
      setActivePage(selectedPage);
    }
  };
  const goToNextPage = () => {
    // check if the form is valid
    const activePageIndex = activePage - 1;
    const page = formConfig.pages[activePageIndex];
    if (isFormPageValid(page, enquiryFormRef)) {
      const values = enquiryFormRef.current.values;
      setSavedFormValues(values);
      navigateToNextPage();
    } else {
      // do nothing if form is not valid
    }
  };
  const submit = () => {
    // check if the form is valid
    const activePageIndex = activePage - 1;
    const page = formConfig.pages[activePageIndex];
    if (isFormPageValid(page, enquiryFormRef)) {
      const values = enquiryFormRef.current.values;
      setSavedFormValues(values);
      enquiryFormRef.current.handleSubmit();
    } else {
      // do nothing if form is not valid
    }
  };

  const timerStopped = () => {
    setShowResetDialog(true);
    setStartTimer(false);
  };

  const resetEnquiryForm = () => {
    // close dialog
    setShowResetDialog(false);
    // empty the saved form values
    setSavedFormValues({});
    // reset form
    enquiryFormRef.current.resetForm();
    // move form page to first page
    setActivePage(1);
    // start timer
    setStartTimer(true);
  };

  return (
    <React.Fragment>
      <h2>Enquiry form</h2>
      <div className="form-body py-4">
        <EmptyCard>
          <Timer
            timeInMinutes={formConfig["timeout-in-minutes"]}
            startTimer={startTimer}
            timerStopped={timerStopped}
          />
          <Reset show={showResetDialog} resetForm={resetEnquiryForm} />
          <Container>
            {!formConfig.pages && (
              <CenteredRow>
                <Spinner animation="border" />
              </CenteredRow>
            )}
            {formConfig.pages && (
              <CenteredForm>
                {formConfig.pages && renderFormPages()}
                <Row>
                  <Col xs="12" md="12" lg="2">
                    <div className="d-flex justify-content-start">
                      {/* hide previous button when user is on first page */}
                      {activePage > 1 && (
                        <Button variant="primary" onClick={goToPreviousPage}>
                          Previous
                        </Button>
                      )}
                    </div>
                  </Col>
                  <Col xs="12" md="12" lg="8">
                    <CenteredRow>
                      <PaginationCustom
                        pageCount={formConfig.pages.length}
                        activePage={activePage}
                      />
                    </CenteredRow>
                  </Col>
                  <Col xs="12" md="12" lg="2">
                    <div className="d-flex justify-content-end">
                      {/* hide next button when user is on last page */}
                      {activePage < formConfig.pages.length && (
                        <Button
                          form="enquiry-form"
                          type="submit"
                          variant="primary"
                          onClick={goToNextPage}
                        >
                          Next
                        </Button>
                      )}
                      {/* show submit button when user is on last page */}
                      {activePage === formConfig.pages.length && (
                        <Button
                          variant="primary"
                          form="enquiry-form"
                          type="submit"
                          onClick={submit}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </CenteredForm>
            )}
          </Container>
        </EmptyCard>
      </div>
    </React.Fragment>
  );
}
