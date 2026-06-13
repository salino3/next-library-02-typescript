import { Dispatch, SetStateAction } from "react";
import "./modal-app.styles.scss";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalApp = ({ showModal, setShowModal }: Props) => {
  return (
    <div className="rootModalApp">
      <div className="containerModalApp">
        <button onClick={() => setShowModal(false)}>Close</button>X
      </div>
    </div>
  );
};
