////////////////////////////////////
//
//  Giriş verilerini form aracılığı iler alıp context'e gönderilen yer.
//
///////////////////////////////////////////////
import React from "react";
import { useInputData } from "../context/InputDataContext";
import { useCalculation } from "../context/CalculationContext";

function Inputs() {

    const {
        installmentInterval, setInstallmentInterval,
        bsmv, setBsmv,
        kkdf, setKkdf,
        numberOfInstallments, setNumberOfInstallments,
        loanAmount, setLoanAmount,
        profitRate, setProfitRate,
    } = useInputData()

    const { fillTable } = useCalculation();


    return (
        <div className="inputs">
            <form className="row"
                onSubmit={(e) => {
                    e.preventDefault();
                    fillTable();        // Tablodaki veriler dolduğunda context api deki tabloyu doldurma fonksiyonunu çalıştırıyor.
                }}>
                <div className="col-sm-12">
                    <label htmlFor="loanAmount"> Kredi Miktarı</label>
                    <input type="number" required min="1" name="loanAmount" id="loanAmount" defaultValue={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} ></input>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="profitRate">Kar Oranı</label>
                    <input type="number" required min="0.01" step="0.01" name="profitRate" id="profitRate" defaultValue={profitRate} onChange={(e) => setProfitRate(e.target.value)}></input>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="bsmv">BSMV</label>
                    <input type="number" required step="0.01" min="0" name="bsmv" id="bsmv" defaultValue={bsmv} onChange={(e) => setBsmv(e.target.value)}></input>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="kkdf">KKDF</label>
                    <input type="number" required step="0.01" min="0" name="kkdf" id="kkdf" defaultValue={kkdf} onChange={(e) => setKkdf(e.target.value)}></input>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="numberOfInstallments">Taksit Sayısı</label>
                    <input type="number" required min="2" name="numberOfInstallments" id="numberOfInstallments" defaultValue={numberOfInstallments} onChange={(e) => setNumberOfInstallments(e.target.value)}></input>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="installmentInterval">Taksit Aralığı</label>
                    <select name="installmentInterval" id="installmentInterval" defaultValue={installmentInterval} onChange={(e) => setInstallmentInterval(e.target.value)}>
                        <option value="aylik">Aylık</option>
                        <option value="yillik">Yıllık</option>
                        <option value="haftalik">Haftalık</option>
                    </select>
                </div>
                <div className="col-sm-6">
                    <button type="submit">Hesapla</button>
                </div>
            </form>
        </div>
    );
}

export default Inputs;
