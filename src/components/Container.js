//////////////////////////////////////
//  input ve info kısımlarını içeren main container component'i
///////////////////////////////////

import InfoArea from "./InfoArea";
import Inputs from "./Inputs";

function Container() {

  return (
    <div className="container">
        <div>Kredi Hesaplama</div>
        <Inputs/>
        <InfoArea/>               
    </div>
  );
}

export default Container;
