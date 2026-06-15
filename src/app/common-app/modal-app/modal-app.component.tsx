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
          <button
            className="btnCloseModal"
            onClick={() => setShowModal(false)}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>{" "}
        </header>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
