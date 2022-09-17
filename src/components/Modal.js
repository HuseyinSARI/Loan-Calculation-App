/////////////////////////////////////////
//
//  Modal'ı içerek component, modal'ın açılıp kapanma işlemleri ref ve useImperativeHandle yardımıyla dışarıdan erişilerek yapılabiliryor.
//
////////////////////////////////////////
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Table from "./Table";

const Modal = (props, ref) => {
  const [modalState, setModalState] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setModalState(true),
  }));

  if (!modalState) return null;

  return (
    <div className="modal">
      <div className="modal_inner">
        <div className="table_header">
          <span>Geri Ödeme Planı</span>
          <button onClick={() => setModalState(false)}>Kapat</button>
        </div>

        <Table />

      </div>
    </div>
  );
};

export default forwardRef(Modal);
