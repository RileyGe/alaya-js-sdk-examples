var Web3a = require("web3");
var AlayaAccounts = require("web3/packages/web3-eth-accounts");
async function main() {

    let web3a = new Web3a('http://47.241.91.2:6789');

    // !!!!将主网的私钥写到代码上并分享给别人是非常危险的操作!!!!
    // address for the privatekey below: atp1sznvsju6gjy3kmgnfgm526jf6e8x83twuctefh
    var privateKey="0x5ae02064df442340f861136acbfc4bd62b3d48393903bd6aac77ce0e7aaa9e5e";
    
    var chainId = 201030; //201018 for mainnet
    // // privatekey for the address below: 0x0727b77a246f2c01c1b7b068c26bd71b81700f7ea003dd1ba68a38885a69a1a5
    var toAddress = "atp1jqtmpjme9gvg6wnuyphzqzgphslfmjtxcy8mt2";
    var act = new AlayaAccounts(web3a.currentProvider, "atp");
    act = act.privateKeyToAccount(privateKey);
    
    let from = act.address;
    let nonce = web3a.utils.numberToHex(await web3a.platon.getTransactionCount(from));
    let gasPrice = await web3a.platon.getGasPrice();
    let tx = {
        from: from,
        to: toAddress,
        value: "1000000000000000000",
        chainId: chainId,
        gasPrice: gasPrice, 
        gas: "21000", 
        nonce: nonce,
    };
    // 签名交易
    let signTx = await act.signTransaction(tx);
    // 发送交易
    let receipt = await web3a.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("The receipt of the transaction is: " + JSON.stringify(receipt));
    console.log("sign tx data:\n", signTx.rawTransaction)
}
main();