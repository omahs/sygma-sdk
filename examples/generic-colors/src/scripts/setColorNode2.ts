import { ethers, BigNumber } from 'ethers'
import { NonceManager } from '@ethersproject/experimental'
import ColorsAbi from '../abis/colors-abi.json'
// const { ethers, BigNumber } = require('ethers')
// const { NonceManager } = require("@ethersproject/experimental");
// const ColorsAbi = require("../abis/colors-abi.json");
const colorsAddress = "0xE54Dc792c226AEF99D6086527b98b36a4ADDe56a";

const toHex = (covertThis: string, padding: number) => {
	return ethers.utils.hexZeroPad(ethers.utils.hexlify(BigNumber.from(covertThis)), padding);
};

const setColor = async () => {
  const bridgeAdmin = "0x5C1F5961696BaD2e73f73417f07EF55C62a2dC5b";
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8547')

  const walletNode2 = ethers.Wallet.fromMnemonic(
    "black toward wish jar twin produce remember fluid always confirm bacon slush",
    "m/44'/60'/0'/0/0",
  );

  const walletSignerNode2 = walletNode2.connect(provider);
  console.log(
    "🚀 ~ file: colors.local.tx.ts ~ line 33 ~ walletSignerNode1",
    walletSignerNode2.address,
  );

  const managedSignerNode2 = new NonceManager(walletSignerNode2);
  const colorContract = new ethers.Contract(
    colorsAddress,
    ColorsAbi.abi
  )

  const color = '0xFF8787'
  const colorToHex = toHex(color, 32)
  console.log("🚀 ~ file: setColorNode1.js ~ line 33 ~ setColor ~ colorToHex", colorToHex)
  const depositData = toHex(bridgeAdmin, 32)

  try {
    await (
      await colorContract.connect(managedSignerNode2).setColor(depositData, colorToHex)
    ).wait(1)
    console.log(`Success to setup color ${color} on Node 1`)
  } catch(e){
    console.log("Error on setting up color", e)
  }

}

setColor()