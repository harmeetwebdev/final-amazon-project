import { Alert } from "react-bootstrap";

export default function MessageBox(props) {
    <Alert variant={props.variant || "info"}>{props.children}</Alert>
}