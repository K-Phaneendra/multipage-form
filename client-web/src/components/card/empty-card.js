import Card from "react-bootstrap/Card";

export default function EmptyCard(props) {
  return (
    <Card>
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
}
