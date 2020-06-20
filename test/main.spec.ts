import { Block } from "../src/class/Block";
import { Blockchain } from "../src/class/Blockchain";

let smashingCoin = new Blockchain();

smashingCoin.addNewBlock(new Block(1, new Date, {
    sender: "Iris Ljesnjanin",
    recipient: "Cosima Mielke",
    quantity: 50
}));

smashingCoin.addNewBlock(new Block(2, new Date, {
    sender: "Vitaly Friedman",
    recipient: "Ricardo Gimenes",
    quantity: 100
}));

smashingCoin.save();
console.log('checkChainValidity', smashingCoin.checkChainValidity());

console.log(JSON.stringify(smashingCoin, null, 4));