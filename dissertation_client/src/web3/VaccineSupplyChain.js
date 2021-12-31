import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import VaccineSupplyChain from '../contracts/VaccineSupplyChain.json';

const getSCEthereumVaccineSupplyChain = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: 'net_version' })
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const vaccineSPSC = new Contract(
        "0x4D60Ccb455863E21133CE927949B353421E57f62",
        VaccineSupplyChain.abi,
        signer
      );

      resolve({vaccineSPSC});
      return;
    }
    reject('Install Metamask');
  });

export default getSCEthereumVaccineSupplyChain;