import React, { useRef } from "react";
import { MdPictureAsPdf } from "react-icons/md";
import { wrapper, close, input, label } from "./style.module.css";

export default function InputModal({ handleToggleModal, handlePdfLoad }) {
  return (
    <div className={wrapper}>
      <label htmlFor="xas78g92" className={label}>
        <MdPictureAsPdf />
        <input
          id="xas78g92"
          className={input}
          type="file"
          onChange={e => {
            handlePdfLoad(e);
            handleToggleModal();
          }}
        />
      </label>
    </div>
  );
}
