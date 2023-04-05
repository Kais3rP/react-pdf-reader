import { useState } from "react";

export function useHandleModal() {
  const [toggleModal, setToggleModal] = useState(false);

  function handleToggleModal() {
    setToggleModal((bool) => !bool);
  }

  return {
    toggleModal,
    handleToggleModal,
  };
}
