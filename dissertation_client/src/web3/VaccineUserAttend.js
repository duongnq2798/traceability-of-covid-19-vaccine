import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import VaccineSupplyChain from '../contracts/VaccineUserAttend.json';

const getSCEthereumVaccineSupplyChain = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: 'net_version' })
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const vaccineSPSC = new Contract(
        VaccineSupplyChain.networks[networkId].address,
        VaccineSupplyChain.abi,
        signer
      );

      resolve({vaccineSPSC});
      return;
    }
    reject('Install Metamask');
  });

export default getSCEthereumVaccineSupplyChain;