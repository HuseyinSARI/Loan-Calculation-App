////////////////////////////////////////////////
//
//    Diğer Context'den gelen verileri alarak esas hesaplama işlemlerinin yapıldığı context.
//
////////////////////////////////////////////////
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useInputData } from "./InputDataContext";

const CalculationContext = createContext();

export const CalculationProvider = ({ children }) => {

  // InputDataContext'deki verileri çektim.
  const {
    installmentRate,    
    bsmv,    
    kkdf,    
    numberOfInstallments,    
    loanAmount,   
    profitRate,    
  } = useInputData();

  // Bu Context'de kullanacağım stateleri oluşturdum.
  const [zProfitRate, setZProfitRate] = useState(1);
  const [interest, setInterest] = useState(1);
  const [installmentAmount, setInstallmentAmount] = useState(1);
  const [totalLoan, setTotalLoan] = useState(1);
  const [totalInterest, setTotalInterest] = useState(1);
  const [totalProfitRate, setTotalProfitRate] = useState(1);
  const [totalBsmv, setTotalBsmv] = useState(1);
  const [totalKkdf, setTotalKkdf] = useState(1);
  const [isTableFill , setIsTableFill] = useState(false);
  const [clickCount , setClickCount] = useState(0);

  // Ödeme tablosuna her veri eklendiğinde re-renden olmasını engellemek için useRef kullandım.
  const paybackTable = useRef([{}]);

  // Esas hesaplamalar ve işlemelerin yapıldığı yer.
  useEffect(() => {
    setZProfitRate(installmentRate * profitRate);  // kar oranını , taksit aralığı ile çarpıyoruz
    setInterest((zProfitRate / 100) * ((bsmv / 100) + (kkdf / 100) + 1) );  // kkdf ve bsmv yi kar oranının üzerine ekliyoruz
    setInstallmentAmount(loanAmount * (interest * (1 + interest) ** numberOfInstallments) / ((1 + interest) ** numberOfInstallments - 1));  // ! Aylık ödenmesi gereken miktarın hesaplandığı kısım
    setTotalLoan(numberOfInstallments * installmentAmount);   // Toplam borcun hesaplandığı kısım
    setTotalInterest(totalLoan - loanAmount);      // Toplam faizin ve masrafların hesaplandığı kısım 
    setTotalProfitRate(totalInterest * (100 / (100 + Number(bsmv) + Number(kkdf))));  // toplam kar oranının hesaplandığı kısım
    setTotalBsmv((totalInterest - totalProfitRate) * (Number(bsmv) / (Number(bsmv) + Number(kkdf))));  // toplam bsmv nin hesaplandığı kısım
    setTotalKkdf((totalInterest - totalProfitRate) * (Number(kkdf) / (Number(bsmv) + Number(kkdf))));  // toplam kkdf nin hesaplandığı kısım
  }); 


  // elimizdeki verileri göre ödeme tablosunu dolduran fonksiyon

  const fillTable = ()=>{

    // tablo boş bir array obcejt tir. tablo daha önce doluysa önce onu boşaltıyoruz. 
    paybackTable.current = [{}];

    for (let index = 1; index <= numberOfInstallments; index++) {

        if(index === 1){
           var tProfitRate = (loanAmount / 100) * zProfitRate;  // ilk taksit hesaplamasını bütün borç üzerinden yapıyoruz.
        }else{
           var tProfitRate =( paybackTable.current[index-1].kalanAnaPara / 100 ) * zProfitRate ; // sonraki taksit hesaplamasını tablodan çektiğimiz kalan ana para üzerinden yapıyoruz
        }

        let tKKDF = tProfitRate * (kkdf / 100);
        let tBMSV = tProfitRate * (bsmv / 100);
        let tPrincipal = installmentAmount - (tProfitRate + tKKDF + tBMSV);
        if(index === 1){
           var  tRemainingPrincipal = loanAmount - tPrincipal;   // ilk taksit için kalan ana para hesabı
        }else{
           var  tRemainingPrincipal = paybackTable.current[index-1].kalanAnaPara - tPrincipal; // daha sonraki ana para hesabını tablodan çekilen verilerden yapıyoruz
        }

        // tüm verileri bir object te topluyoruz
        let veri = {   
            taksitNo : index,
            taksitTutari : installmentAmount,
            anaPara : tPrincipal,
            kalanAnaPara : tRemainingPrincipal,
            karTutari : tProfitRate,
            kkdf : tKKDF,
            bsmv : tBMSV,
        };

          // tablonun içerisine push ediyoruz.
          paybackTable.current.push(veri);
      }
      // tabloyu doldurduğumuzu ve butona tıklandığını tespit etmek için kullandığım state ler
      setIsTableFill(true);
      setClickCount(clickCount + 1);
  }

  // hesaplanan verileri child componentlere yolluyoruz.
  const values = {
    zProfitRate, setZProfitRate,
    interest, setInterest,
    installmentAmount, setInstallmentAmount,
    totalLoan, setTotalLoan,
    totalInterest, setTotalInterest,
    totalProfitRate, setTotalProfitRate,
    totalBsmv, setTotalBsmv,
    totalKkdf, setTotalKkdf,
    fillTable,
    isTableFill, setIsTableFill,
    paybackTable,
    clickCount, setClickCount,
  };

  return<CalculationContext.Provider value={values}>{children}</CalculationContext.Provider>;

};

// daha kolay kullanım için custom hook tanımı
export const useCalculation = () => useContext(CalculationContext);
