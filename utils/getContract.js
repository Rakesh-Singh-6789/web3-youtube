import { ethers } from "ethers";
import { YouTubeAbi } from "../contracts/YouTube";

export default function getContract() {
  // Creating a new provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Getting the signer
  const signer = provider.getSigner();
  // Creating a new contract factory with the signer, address and ABI
  let contract = new ethers.Contract(
    "0xfd1ef046f0B4dB8D46718Ba5C03EecA65ba6baf1",
    YouTubeAbi.abi,
    signer
  );
  // Returning the contract
  return contract;
}
