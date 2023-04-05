import React from "react";
import { MdPictureAsPdf } from "react-icons/md";
import styles from "./style.module.css";

export default function InputModal({ handleToggleModal, handlePdfLoad }) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="xas78g92" className={styles.label}>
        <MdPictureAsPdf />
        <input
          id="xas78g92"
          className={styles.input}
          type="file"
          onChange={(e) => {
            handlePdfLoad(e);
            handleToggleModal();
          }}
        />
      </label>
    </div>
  );
}
