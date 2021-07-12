var Web3a = require("web3");
async function main() {
    let web3a = new Web3a('http://47.241.91.2:6789');

    // !!!!将主网的私钥写到代码上并分享给别人是非常危险的操作!!!!
    // address for the privatekey below: atp1sznvsju6gjy3kmgnfgm526jf6e8x83twuctefh
    var privateKey="0x5ae02064df442340f861136acbfc4bd62b3d48393903bd6aac77ce0e7aaa9e5e";    
    var chainId = 201030; //201018 for mainnet    
    let from = web3a.platon.accounts.privateKeyToAccount(privateKey).address.mainnet;
    let gasPrice = await web3a.platon.getGasPrice();
    // 之前已经部署好的智能合约
    let contractAddress = "atp1pcvx85klajfw9mvy3tf07acmqxaek5nanuy5t6";
    let abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "setName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    let contract = new web3a.platon.Contract(abi, contractAddress);
    let name = await contract.methods.getName().call();
    console.log("name before change: " + name);
    let trans = contract.methods.setName("rileyge");
    let options ={
        to      : trans._parent._address, //也可以使用contractAddress
        data    : trans.encodeABI(), //abi的构造方法可以参照
        gas     : await trans.estimateGas({from: from}),
        gasPrice: gasPrice,
        chainId	: chainId
    }
    signTx = await web3a.platon.accounts.signTransaction(options, privateKey);
    // 发送交易    
    receipt = await web3a.platon.sendSignedTransaction(signTx.rawTransaction);
    name = await contract.methods.getName().call();
    console.log("name after change: " + name);
}
main();