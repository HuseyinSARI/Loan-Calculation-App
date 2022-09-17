////////////////////////////////////////7
//
//  Kullanınıcıdan gelen input verilerini bu context'de tutuyoruz.
//
//////////////////////////////////
import {createContext, useContext, useState, useEffect} from "react";

const InputDataContext = createContext();

export const InputDataProvider = ({children}) => {

    //Gerekli olan verileri uygun state lerde tututuk.
    const [installmentInterval, setInstallmentInterval] = useState("aylik");
    const [installmentRate, setInstallmentRate] = useState(1);
    const [bsmv, setBsmv] = useState(10);
    const [kkdf, setKkdf] = useState(15);
    const [numberOfInstallments, setNumberOfInstallments] = useState(12);
    const [loanAmount, setLoanAmount] = useState(100000);
    const [profitRate, setProfitRate] = useState(2.28);

    // Seçilen ödeme aralığına göre faiz'i uygun değer ile çarpılıyor. Default olarak "aylık" seçilirse "1" ile,
    // "yıllık" seçilise "12" ile, "haftalık" seçilirse "0.25" ile toplam faiz çarpılır
    useEffect(()=>{
        switch (installmentInterval) {
            case "yillik":
                setInstallmentRate(12);
                break;
            case "aylik":
                setInstallmentRate(1);
                break;
            case "haftalik":
                setInstallmentRate(0.25);
                break;

            default:
                break;
        }
    },[installmentInterval]);

    // Elde edilen verileri alt component lerde kullanmak için value içine alıp provider içinden gönderiyoruz.
    const values = {
        installmentInterval, setInstallmentInterval,
        installmentRate, setInstallmentRate,
        bsmv, setBsmv,
        kkdf, setKkdf,
        numberOfInstallments, setNumberOfInstallments,
        loanAmount, setLoanAmount,
        profitRate, setProfitRate,
    }
    // Kullanırken kolaylık olması için return işleminde .Provider elementini kullandım.
    return  <InputDataContext.Provider value = {values}> {children} </InputDataContext.Provider>; 
};

// Context api 'yi her kullanımdan tekrar useContext i import etmeyi engellemek için kendi custom hook umu yazdım.
export const useInputData = () => useContext(InputDataContext);