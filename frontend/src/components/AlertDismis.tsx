import Alert from "react-bootstrap/Alert";

function AlertDismis(props) {
  return (
    <Alert variant="danger" dismissible>
      <Alert.Heading>Error</Alert.Heading>
      <p>{props.error}</p>
    </Alert>
  );
}

export default AlertDismis;
