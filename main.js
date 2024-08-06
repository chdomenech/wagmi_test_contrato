import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { getAccount, writeContract, readContract, fetchBalance, waitForTransaction, disconnect, watchAccount, switchNetwork, getNetwork } from '@wagmi/core';
import { bscTestnet } from '@wagmi/core/chains';
import Swal from 'sweetalert2';

// Manipulando el DOM
const btnE2 = document.getElementById('btn2');
const userEl = document.getElementById('user');
const bnb = document.getElementById('bnb');
const montos = document.getElementById('montos');
const total_USDT = document.getElementById('total_USDT');
const gastar = document.getElementById('gastar');
const comprar = document.getElementById('comprar');
const comprarBNB = document.getElementById('comprarBNB'); // Nuevo botón para comprar en BNB

var valorUint256Amount = 0;
var address_user = '';
const decimals = 18; // Asegúrate de usar el valor correcto de decimales

gastar.style.display = 'block'; 
comprar.style.display = 'block'; 
comprarBNB.style.display = 'block'; // Mostrar el botón de BNB

// 1. Define constants
//const projectId =  import.meta.env.VITE_PROJECT_ID;
const projectId =  "097d1d851f73d212d3fb14a6401e6b0f";
const smartContract = "0xE75EAE7C47Bd55226A37b2c807e25Fa6a6CD7e62";
const wagmigotchiABI = [{"inputs":[{"internalType":"address","name":"_usdtToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"AdditionalWalletsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"tokenType","type":"string"}],"name":"Distribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"addAdditionalWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"additionalWallets","outputs":[{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"usdAmount","type":"uint256"}],"name":"convertToBNBWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"bool","name":"isBNB","type":"bool"}],"name":"distributeTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAdditionalWallets","outputs":[{"internalType":"address[]","name":"wallets","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestPriceBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalAdditionalUSDT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"removeAdditionalWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_usdtToken","type":"address"}],"name":"setUsdtToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"setWalletBalanceReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawBalances","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

//Smart contrat USDT
const USDT_TOKEN = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
const USDT_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];


// 2. Create wagmiConfig
const metadata = {
  name: 'TokenDistributor',
  description: 'TokenDistributor',
  url: 'https://criptosolucion.vip',
  icons: ["https://criptosolucion.com/favicon/favicon-96x96.png"]
}

// Cadena de BSC testnet
const chains = [bscTestnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
const modal = createWeb3Modal({ wagmiConfig, projectId, chains })

// Eventos
btnE2.addEventListener('click', connect)
gastar.addEventListener('click', approveUSDT)
comprar.addEventListener('click', sendTokens)
comprarBNB.addEventListener('click', sendTokensInBNB) // Nuevo evento para enviar en BNB

function connect() {  
  if (getAccount().isConnected) {
    disconnect()
  } else {    
    console.log("Open");
    modal.open()
  }
}

// Listening for account changes
watchAccount(account  => {
  address_user = account.address ?? '';
  if (account.isConnected) {
    btnE2.innerText = 'Disconnect'
    if (address_user != '') {
      const address = address_user.substring(0, 4) + "..." + address_user.substring(32, address_user.length);
      userEl.innerText = address;
      readBalances();
    }
  } else {    
    btnE2.innerText = 'Conectar wallet'
    userEl.innerText = "";
  }
})

// Lee los balances al conectarse la wallet
async function readBalances() { 
  const { chain } = getNetwork();
  if (chain.id != 97) {
    await switchNetwork({ chainId: 97 });
  }

  const otrosMontos = await readContract({
    address: smartContract,
    abi: wagmigotchiABI,
    functionName: 'getTotalAdditionalUSDT'
  }); 

  const valorBNB = await readContract({
    address: smartContract,
    abi: wagmigotchiABI,
    functionName: 'getLatestPriceBNB'
  }); 
 
  const readableAmount = Number(otrosMontos) / Math.pow(10, decimals);
  bnb.innerHTML = valorBNB;
  const total = 3 + readableAmount;
  montos.innerHTML= readableAmount + " USDT";
  total_USDT.innerHTML = total;

  valorUint256Amount = Math.floor(total * Math.pow(10, decimals));
  console.log(valorUint256Amount);
}

// Función para aprobar USDT
async function approveUSDT() {
  try {
    const tx = await writeContract({
      address: USDT_TOKEN,
      abi: USDT_ABI,
      functionName: 'approve',
      args: [smartContract, valorUint256Amount]
    });

    const receipt = await waitForTransaction({ hash: tx.hash });
    if (receipt.status === 1) {
      Swal.fire({
        icon: 'success',
        title: 'Aprobados los tokens.',        
        width: 600,
        padding: '3em',
        background: '#191a1a',
        color: '#20f597'
      });
    } else {
      console.error('Approval failed');
    }
  } catch (error) {
    console.error('Error approving tokens:', error);
  }
}

// Función para enviar tokens en USDT
async function sendTokens() {
  const valorOne = Math.floor(1 * Math.pow(10, decimals)); // 1 USDT en unidad mínima
  const valorTwo = Math.floor(2 * Math.pow(10, decimals)); // 2 USDT en unidad mínima
  const totalAmount = valorOne + valorTwo;

  try {
    const tx = await writeContract({
      address: smartContract,
      abi: wagmigotchiABI,
      functionName: 'distributeTokens',
      args: [
        ["0x0c99f55408923B2dFd7b0df1bEd2332BB38F7229"],
        [valorOne],
        totalAmount,
        false
      ]
    });

    const hash = tx.hash;
    Swal.fire({
      title: 'Procesando!!!',
      width: 600,
      padding: '3em',
      timerProgressBar: true,
      background: '#191a1a',
      color: '#20f597'
    });

    if (hash !== '') {
      await waitForTransaction({ hash })
        .then(result => {
          Swal.fire({
            icon: 'success',
            title: 'Envio exitoso!!!.',
            width: 600,
            padding: '3em',
            background: '#191a1a',
            color: '#20f597'
          });
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            background: '#191a1a',
            color: '#20f597',
            text: error.message
          });
        });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      background: '#191a1a',
      color: '#20f597',
      text: error.message
    });
  }
}
async function sendTokensInBNB() {
  try {
    // Definir valores en USD
    const oneUSDTValue = 1; // Valor en USD
    const twoUSDTValue = 2; // Valor en USD

    // Obtener el valor en Wei para cada cantidad de USD
    const valorOneUSDTInWei = BigInt(await readContract({
      address: smartContract,
      abi: wagmigotchiABI,
      functionName: 'convertToBNBWei',
      args: [oneUSDTValue]
    }));

    const valorTwoUSDTInWei = BigInt(await readContract({
      address: smartContract,
      abi: wagmigotchiABI,
      functionName: 'convertToBNBWei',
      args: [twoUSDTValue]
    }));

    console.log("1 USDT en Wei:", valorOneUSDTInWei.toString());
    console.log("2 USDT en Wei:", valorTwoUSDTInWei.toString());

    // Obtener las wallets adicionales y sus montos
    const [additionalWallets, additionalAmounts] = await readContract({
      address: smartContract,
      abi: wagmigotchiABI,
      functionName: 'getAdditionalWallets',
    });

    let additionalWeiTotal = BigInt(0);
    let additionalAmountsInWei = [];

    // Convertir los montos adicionales de Wei a enteros y luego de vuelta a Wei
    for (let i = 0; i < additionalAmounts.length; i++) {
      // Convertir el valor de Wei a su representación entera en USD
      const amountInUSD = Number(additionalAmounts[i]) / 1e18;

      console.log("amountInUSD ",amountInUSD);

      // Volver a convertir el entero a Wei
      const amountInWei = BigInt(await readContract({
        address: smartContract,
        abi: wagmigotchiABI,
        functionName: 'convertToBNBWei',
        args: [amountInUSD]
      }));

      additionalAmountsInWei.push(amountInWei);
      additionalWeiTotal += amountInWei;
    }

    // Calcular el total de Wei a enviar
    const totalWei = valorOneUSDTInWei + valorTwoUSDTInWei + additionalWeiTotal;

    console.log("Total USD en Wei:", totalWei.toString());

    // Concatenar las direcciones y los montos
    const recipients = [
      "0x0c99f55408923B2dFd7b0df1bEd2332BB38F7229",
      "0x6AbC6d5993113649D34249E28A17Be1cE71791D6",
      ...additionalWallets
    ];

    const amountsInWei = [
      valorOneUSDTInWei,
      valorTwoUSDTInWei,
      ...additionalAmountsInWei
    ];

    // Realizar la transacción en BNB
    const tx = await writeContract({
      address: smartContract,
      abi: wagmigotchiABI,
      functionName: 'distributeTokens',
      args: [
        recipients,
        amountsInWei,
        totalWei,
        true // Enviar en BNB
      ],
      value: totalWei.toString() // Enviar el valor total en Wei
    });

    const hash = tx.hash;
    Swal.fire({
      title: 'Procesando!!!',
      width: 600,
      padding: '3em',
      timerProgressBar: true,
      background: '#191a1a',
      color: '#20f597'
    });

    if (hash !== '') {
      await waitForTransaction({ hash })
        .then(result => {
          Swal.fire({
            icon: 'success',
            title: 'Envio exitoso en BNB!!!.',
            width: 600,
            padding: '3em',
            background: '#191a1a',
            color: '#20f597'
          });
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            background: '#191a1a',
            color: '#20f597',
            text: error.message
          });
        });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      background: '#191a1a',
      color: '#20f597',
      text: error.message
    });
  }
}





// Redondea un número
const round = (n, dp) => {
  const h = +('1'.padEnd(dp + 1, '0'))
  return Math.round(n * h) / h
}
