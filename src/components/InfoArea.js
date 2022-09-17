////////////////////////////////7
//
// Kullanıcıya hesaplanan kredi verilerinin kaba taslak halinin gösterildiği kısım
//
///////////////////////////////7

import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

import { useCalculation } from "../context/CalculationContext";

function InfoArea() {
  const {
    totalLoan,
    installmentAmount,
    isTableFill,
    totalBsmv,
    totalKkdf,
    clickCount,
  } = useCalculation();

  const [_totalLoan, set_totalLoan] = useState();
  const [_installmentAmount, set_installmentAmount] = useState();
  const [_totalTax, set_totalTax] = useState();

  const modalRef = useRef();
  
  const handleOpenModal = () => {
    modalRef.current.openModal();
  };

  // Hesalama butonunu her tıklandığında verileri tekrar hesaplamak için
  useEffect(() => {
    set_totalLoan(totalLoan);
    set_installmentAmount(installmentAmount);
    set_totalTax(totalBsmv + totalKkdf);
  }, [clickCount]);

  // sadece tablo doluysa çalışcaktır
  if (isTableFill) {
    return (
      <div className="infoArea">
        <div>
          <h5>Taksit Tutarı</h5>
          <h2>{Number(_installmentAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h2>   
        </div>
        <div>
          <span>Toplam Borç </span> <span>{Number(_totalLoan).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
        </div>
        <hr />
        <div>
          <span>Toplam Vergi</span>
          <span>{Number(_totalTax).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
        </div>
        <div>
          {" "}
          <button onClick={handleOpenModal}>Taksit Tablosunu Göster</button>
        </div>

        
        <Modal ref={modalRef} />    {/* Modal içindeki, modal'ın açılmasını sağlayan fonksiyona dışarıdan erişmek için useRef kullandım.  */}
 
      </div>
    );
  }
}

export default InfoArea;
