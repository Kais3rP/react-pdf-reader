import React, { useRef } from "react";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { GrDocumentPdf } from "react-icons/gr";
import { useLoadPdf } from "./hooks/useLoadPdf";
import { useHandleModal } from "./hooks/useHandleModal";
import InputModal from "../InputModal";
import {
  spinner,
  wrapper,
  canvasContainer,
  controlsContainer,
  button,
  pageDisplay,
  dropDown,
  hint
} from "./style.module.css";

export default function PdfLoader() {
  const canvasRef = useRef(null);

  const {
    handlePdfLoad,
    handleIncrementPage,
    handleDecrementPage,
    currentPage,
    isLoading,
    hasLoaded,
    numOfPages
  } = useLoadPdf(canvasRef);

  const { toggleModal, handleToggleModal } = useHandleModal();

  return (
    <div className={wrapper}>
      <div className={dropDown}>
        {toggleModal ? (
          <IoMdArrowDropupCircle onPointerDown={handleToggleModal} />
        ) : (
          <IoMdArrowDropdownCircle onPointerDown={handleToggleModal} />
        )}
      </div>
      {toggleModal && (
        <InputModal
          handlePdfLoad={handlePdfLoad}
          handleToggleModal={handleToggleModal}
        />
      )}
      {(!hasLoaded && !isLoading) && (
        <div className={hint}>
          <GrDocumentPdf />
          <h2>Previewer</h2>
        </div>
      )}
      <div className={canvasContainer}>
        {isLoading && <div className={spinner} />}
        <canvas ref={canvasRef} />
      </div>
      <div className={controlsContainer}>
        {!isLoading && (
          <button className={button} onClick={handleDecrementPage}>
            &lt;
          </button>
        )}
        <div className={pageDisplay}>{currentPage || 0}/{numOfPages || 0}</div>
        {!isLoading && (
          <button className={button} onClick={handleIncrementPage}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}
