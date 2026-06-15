import React, { Dispatch, SetStateAction } from "react";
import "./modal-app.styles.scss";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const ModalApp = ({ showModal, setShowModal, children }: Props) => {
  return (
    <div className="rootModalApp">
      <div className="containerModalApp">
        <header>
          <button onClick={() => setShowModal(false)}>Close</button>
        </header>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
