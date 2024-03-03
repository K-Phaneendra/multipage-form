import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

export default function Timer({ timeInMinutes, startTimer, timerStopped }) {
  const [timeLeft, setTimeLeft] = useState("00:00");

  const startCountdown = () => {
    const countdownInterval = 1000; // i.e. 1 second
    let timeInMilliseconds = timeInMinutes * 60 * 1000;
    const timerId = setInterval(function () {
      timeInMilliseconds -= countdownInterval;
      const min = Math.floor(timeInMilliseconds / (60 * 1000));
      const sec = Math.floor((timeInMilliseconds - min * 60 * 1000) / 1000);
      if (timeInMilliseconds <= 0) {
        // time completed - stop countdown
        clearInterval(timerId);
        setTimeLeft("00:00");
        timerStopped();
      } else {
        setTimeLeft(
          `${min} minute${min > 1 ? "s" : ""} : ${sec} second${
            sec > 1 ? "s" : ""
          }`
        );
      }
    }, countdownInterval);
  };

  useEffect(() => {
    if (timeInMinutes && startTimer) {
      startCountdown();
    }
  }, [startTimer]);

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs="12" md="12" lg="12">
            <b>Time left:</b> {timeLeft}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

Timer.propTypes = {
  timeInMinutes: PropTypes.number,
};
