import React, { ReactNode, useEffect, useState } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
`;

const useModal = () => {
  const [modalOpend, setModalOpend] = useState(false);

  const openModal = () => {
    setModalOpend(true);
  };
  const closeModal = () => {
    setModalOpend(false);
  };

  interface IProps {
    children: ReactNode;
  }

  const ModalPortal: React.FC<IProps> = ({ children }) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector("#root-modal");
        ref.current = dom;
      }
    }, []);

    if (ref.current && mounted && modalOpend) {
      // 첫 번째 인자를 두 번재에 넣음
      return createPortal(
        <Container>
          <div className="modal-background" role="presentation" onClick={closeModal} />
          {children}
        </Container>,
        ref.current,
      );
    }
    return null;
  };

  return {
    openModal,
    closeModal,
    ModalPortal,
  };
};

export default useModal;
