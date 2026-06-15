import React, { Dispatch, SetStateAction } from "react";
import "./modal-app.styles.scss";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const ModalApp = ({ showModal, setShowModal, children }: Props) => {
  if (!showModal) return null;

  return (
    // Clicking the background overlay closes the modal safely
    <div className="rootModalApp" onClick={() => setShowModal(false)}>
      <div className="containerModalApp" onClick={(e) => e.stopPropagation()}>
        <header>
          <button onClick={() => setShowModal(false)}>Close</button>
        </header>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
