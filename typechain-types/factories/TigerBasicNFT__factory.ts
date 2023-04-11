/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TigerBasicNFT, TigerBasicNFTInterface } from "../TigerBasicNFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_artist",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_startingPrice",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tigerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "TigerForSale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tigerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "TigerSold",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tigerId",
        type: "uint256",
      },
    ],
    name: "TigerWithdrawnFromSale",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tigerId",
        type: "uint256",
      },
    ],
    name: "buyTiger",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tigerId",
        type: "uint256",
      },
    ],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getWithdrawalBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tigerId",
        type: "uint256",
      },
    ],
    name: "isForSale",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pendingWithdrawals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tigerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minSalePriceInWei",
        type: "uint256",
      },
    ],
    name: "putUpForSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tigerByOwnerAndIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tigersForSale",
    outputs: [
      {
        internalType: "bool",
        name: "isForSale",
        type: "bool",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tigerId",
        type: "uint256",
      },
    ],
    name: "withdrawFromSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610f46380380610f4683398101604081905261002f91610073565b6001600160a01b03821661004257600080fd5b600180546001600160a01b039093166001600160a01b031993841617905560025560008054909116331790556100ad565b6000806040838503121561008657600080fd5b82516001600160a01b038116811461009d57600080fd5b6020939093015192949293505050565b610e8a806100bc6000396000f3fe6080604052600436106100c75760003560e01c806390f83fa711610074578063c598b5631161004e578063c598b5631461025a578063f3f4370314610290578063f8b2cb4f146102bd57600080fd5b806390f83fa7146101ef578063abe572a314610202578063c41a360a1461022257600080fd5b80635e96c694116100a55780635e96c6941461012b5780638546d0021461014b5780638861c2af1461018257600080fd5b806318160ddd146100cc57806324600fc3146100f4578063321a3e2f1461010b575b600080fd5b3480156100d857600080fd5b506100e1606481565b6040519081526020015b60405180910390f35b34801561010057600080fd5b506101096102f3565b005b34801561011757600080fd5b50610109610126366004610d27565b6103a7565b34801561013757600080fd5b50610109610146366004610d40565b6104e8565b34801561015757600080fd5b5061016b610166366004610d27565b610636565b6040805192151583526020830191909152016100eb565b34801561018e57600080fd5b506101ca61019d366004610d27565b6007602052600090815260409020805460019091015460ff82169161010090046001600160a01b03169083565b6040805193151584526001600160a01b039092166020840152908201526060016100eb565b6101096101fd366004610d27565b6106ae565b34801561020e57600080fd5b506100e161021d366004610d79565b6109dd565b34801561022e57600080fd5b5061024261023d366004610d27565b610a79565b6040516001600160a01b0390911681526020016100eb565b34801561026657600080fd5b506100e1610275366004610da3565b6001600160a01b031660009081526008602052604090205490565b34801561029c57600080fd5b506100e16102ab366004610da3565b60086020526000908152604090205481565b3480156102c957600080fd5b506100e16102d8366004610da3565b6001600160a01b031660009081526004602052604090205490565b33600081815260086020526040808220805490839055905190929083908381818185875af1925050503d8060008114610348576040519150601f19603f3d011682016040523d82523d6000602084013e61034d565b606091505b50509050806103a35760405162461bcd60e51b815260206004820152601060248201527f5472616e73666572206661696c65642e0000000000000000000000000000000060448201526064015b60405180910390fd5b5050565b606481106103ec5760405162461bcd60e51b8152602060048201526012602482015271696e646578206f7574206f662072616e676560701b604482015260640161039a565b336103f682610a79565b6001600160a01b0316146104385760405162461bcd60e51b81526020600482015260096024820152683737ba1037bbb732b960b91b604482015260640161039a565b6040805160608101825260008082526020808301828152838501838152868452600790925284832093518454915174ffffffffffffffffffffffffffffffffffffffffff1990921690151574ffffffffffffffffffffffffffffffffffffffff001916176101006001600160a01b0390921691909102178355516001909201919091559051829133917f07095a31592b9631fa0e785c4e16b90af4a9e393080031fb4d468a2f6bbbad6e9190a350565b6064821061052d5760405162461bcd60e51b8152602060048201526012602482015271696e646578206f7574206f662072616e676560701b604482015260640161039a565b3361053783610a79565b6001600160a01b0316146105795760405162461bcd60e51b81526020600482015260096024820152683737ba1037bbb732b960b91b604482015260640161039a565b60408051606081018252600180825233602080840182815284860187815260008981526007845287902095518654925174ffffffffffffffffffffffffffffffffffffffffff1990931690151574ffffffffffffffffffffffffffffffffffffffff001916176101006001600160a01b0390931692909202919091178555519390920192909255915183815284927fcc7d5ae60860406bc3b5f896fa4db504ac337ad03c51fe881e387efb7140a1af910160405180910390a35050565b6000806064831061067e5760405162461bcd60e51b8152602060048201526012602482015271696e646578206f7574206f662072616e676560701b604482015260640161039a565b600061068984610af1565b8051909150156106a25760400151600194909350915050565b50600093849350915050565b606481106106f35760405162461bcd60e51b8152602060048201526012602482015271696e646578206f7574206f662072616e676560701b604482015260640161039a565b60006106fe82610af1565b805190915061074f5760405162461bcd60e51b815260206004820152600c60248201527f6e6f7420666f722073616c650000000000000000000000000000000000000000604482015260640161039a565b80604001513410156107a35760405162461bcd60e51b815260206004820152600d60248201527f7072696365206e6f74206d657400000000000000000000000000000000000000604482015260640161039a565b6107ac82610a79565b6001600160a01b031681602001516001600160a01b0316146108105760405162461bcd60e51b815260206004820152601560248201527f73656c6c6572206e6f206c6f6e676572206f776e730000000000000000000000604482015260640161039a565b61081f82338360200151610ba2565b6040805160608101825260008082526020808301828152838501838152878452600783529490922092518354925174ffffffffffffffffffffffffffffffffffffffffff1990931690151574ffffffffffffffffffffffffffffffffffffffff001916176101006001600160a01b03938416021783559251600192830155905491830151918116911614156108e6576020808201516001600160a01b0316600090815260089091526040812080543492906108db908490610ddb565b909155506109839050565b600060646108f5346005610df3565b6108ff9190610e12565b90506000606461091034605f610df3565b61091a9190610e12565b6001546001600160a01b0316600090815260086020526040812080549293508492909190610949908490610ddb565b90915550506020808401516001600160a01b03166000908152600890915260408120805483929061097b908490610ddb565b909155505050505b81336001600160a01b031682602001516001600160a01b03167ff69a3a36e924ed1fedca536c3db60545f23868a494eef4414643b4d9cbe4a86f84604001516040516109d191815260200190565b60405180910390a45050565b6001600160a01b0382166000908152600460205260408120548210610a505760405162461bcd60e51b815260206004820152602360248201527f6f776e657220646f65736e277420686176652074686174206d616e792074696760448201526265727360e81b606482015260840161039a565b506001600160a01b03919091166000908152600560209081526040808320938352929052205490565b600060648210610ac05760405162461bcd60e51b8152602060048201526012602482015271696e646578206f7574206f662072616e676560701b604482015260640161039a565b6000828152600360205260409020546001600160a01b031680610aeb57506001546001600160a01b03165b92915050565b60408051606081018252600080825260208201819052918101919091526000828152600360205260409020546001600160a01b0316610b57575050604080516060810182526001808252546001600160a01b031660208201526002549181019190915290565b506000818152600760209081526040918290208251606081018452815460ff81161515825261010090046001600160a01b03169281019290925260010154918101919091525b919050565b600083815260036020908152604080832080546001600160a01b038781167fffffffffffffffffffffffff00000000000000000000000000000000000000008316811790935591855260049093529083208054929091161592610c0483610e34565b919050555080610cc7576001600160a01b0382166000908152600460205260408120805491610c3283610e4f565b90915550506001600160a01b038216600090815260046020908152604080832054878452600690925290912054808214610ca0576001600160a01b03841660009081526005602090815260408083208584528252808320548484528184208190558352600690915290208190555b506001600160a01b0383166000908152600560209081526040808320938352929052908120555b6001600160a01b038316600090815260046020526040812054610cec90600190610e66565b6001600160a01b0390941660009081526005602090815260408083208784528252808320889055968252600690529490942092909255505050565b600060208284031215610d3957600080fd5b5035919050565b60008060408385031215610d5357600080fd5b50508035926020909101359150565b80356001600160a01b0381168114610b9d57600080fd5b60008060408385031215610d8c57600080fd5b610d9583610d62565b946020939093013593505050565b600060208284031215610db557600080fd5b610dbe82610d62565b9392505050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610dee57610dee610dc5565b500190565b6000816000190483118215151615610e0d57610e0d610dc5565b500290565b600082610e2f57634e487b7160e01b600052601260045260246000fd5b500490565b6000600019821415610e4857610e48610dc5565b5060010190565b600081610e5e57610e5e610dc5565b506000190190565b600082821015610e7857610e78610dc5565b50039056fea164736f6c6343000809000a";

type TigerBasicNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TigerBasicNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TigerBasicNFT__factory extends ContractFactory {
  constructor(...args: TigerBasicNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TigerBasicNFT";
  }

  deploy(
    _artist: string,
    _startingPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TigerBasicNFT> {
    return super.deploy(
      _artist,
      _startingPrice,
      overrides || {}
    ) as Promise<TigerBasicNFT>;
  }
  getDeployTransaction(
    _artist: string,
    _startingPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_artist, _startingPrice, overrides || {});
  }
  attach(address: string): TigerBasicNFT {
    return super.attach(address) as TigerBasicNFT;
  }
  connect(signer: Signer): TigerBasicNFT__factory {
    return super.connect(signer) as TigerBasicNFT__factory;
  }
  static readonly contractName: "TigerBasicNFT";
  public readonly contractName: "TigerBasicNFT";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TigerBasicNFTInterface {
    return new utils.Interface(_abi) as TigerBasicNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TigerBasicNFT {
    return new Contract(address, _abi, signerOrProvider) as TigerBasicNFT;
  }
}
