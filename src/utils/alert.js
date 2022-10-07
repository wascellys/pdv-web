import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function basicAlert(title, text, type) {
  MySwal.fire({
    icon: type,
    title: title,
    text: text,
  });
}
