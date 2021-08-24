const Web3a = require('web3');
const Accounts = require('web3/packages/web3-eth-accounts/src');
async function main() {    
    let web3a = new Web3a('http://47.241.91.2:6789');
    const ppos = web3a.ppos; // 后面例子我都以 ppos 为对象。就不写成 web3.ppos 了。
    ppos.setChainId(201030); //如果使用Samurai不需要此步骤。由于很多网络开放接口的问题，chainId无法自动设置，帮加入此功能
    // address for the privatekey below: atp1sznvsju6gjy3kmgnfgm526jf6e8x83twuctefh
    const privateKey = '0x5ae02064df442340f861136acbfc4bd62b3d48393903bd6aac77ce0e7aaa9e5e'; //注：一定要以0x开头
    var act = new Accounts(web3a.currentProvider, "atp");
    const address = act.address;

    // 例子1：委托
    // 节点DolphinTwo的nodeId
    let nodeId = "0x335c2bb831261730f6a71a97fdd91da8d9518c8ff87f648df45145deadf03cdf85422dbcaf46a933ee9a18434f1f61e2efa0b0f509dda2563f421c7615f6b869";
    let amount = web3a.utils.toVon("1");
    try {
        let data = {
            funcType: 1004,
            typ: 0,
            nodeId: Web3a.PPOS.hexToBuffer(nodeId),
            amount: web3a.utils.toBN(amount)
        }
        let tx = await ppos.buildTransaction(data, {from: address});
        // 签名交易
        let signTx = await act.signTransaction(tx);
        // 发送交易
        let receipt = await web3a.platon.sendSignedTransaction(signTx.rawTransaction);
        console.log(receipt);
    } catch (error) {
        console.log(error);
    }

    // 例子2：查询所有实时的候选人列表
    // 传参以对象形式调用： 1102. getCandidateList() : 查询所有实时的候选人列表
    let data = {
        funcType: 1102,
    }
    let receipt = await ppos.call(data);
    console.log('getCandidateList params object reply: ', receipt);
}
main();