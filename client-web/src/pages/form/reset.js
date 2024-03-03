import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Reset({ show, resetForm }) {
  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Reset enquiry form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your time to fill the form is completed. Please reset the form to
          continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={resetForm}>
            Reset form
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Reset;
