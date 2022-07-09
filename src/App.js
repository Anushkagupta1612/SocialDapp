import { useMoralis } from "react-moralis";
import { useState } from 'react';
import Navbarcomp from "./Navbar";
import ImageList from "./ImageList";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import abi from './artifacts/contracts/socialdapp.sol/socialdapp.json';
const contractABI = abi.abi;
const contractAddress = "0x976C214741b4657bd99DFD38a5c0E3ac5C99D903";

// localhost: 0x976C214741b4657bd99DFD38a5c0E3ac5C99D903
// rinkeby: 0x7c29bf39DE0E3b82F99673425A739a77574CD1A7


function App () {
  const [ signer, setSigner ] = useState( '' )
  const [ contract, setContract ] = useState( '' );
  const { authenticate, isAuthenticated, user } = useMoralis();

  const onClickConnectWalletHandler = async () => {
    await authenticate();
    const signerAddress = ( isAuthenticated ? user.get( 'ethAddress' ) : "Not logged in" );
    setSigner( signerAddress )
  }

  return (
    <div className="App">
      <Navbarcomp onClickHandler={ onClickConnectWalletHandler } isAuthenticated={ isAuthenticated } signer={ signer } />
      <ImageList />
    </div>
  );
}

export default App;
