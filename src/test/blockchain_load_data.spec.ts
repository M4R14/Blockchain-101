import { Block } from "../Block";
import { Blockchain } from "../Blockchain";

const main = async () => {
    const smashingCoin = new Blockchain();

    smashingCoin.addNewBlock(new Block(2, "2020-06-18", {
        sender: "Vitaly Friedman",
        recipient: "Ricardo Gimenes",
        quantity: 1111,
    }));

    await smashingCoin.save();

    await smashingCoin.load();

    console.log(smashingCoin.blockchain.length);

    if (smashingCoin.checkChainValidity() == false) {
        throw "[0] checkChainValidity false";
    }

    smashingCoin.addNewBlock(new Block(2, "2020-06-18", {
        sender: "Vitaly Friedman",
        recipient: "Ricardo Gimenes",
        quantity: 1111
    }));

    if (smashingCoin.checkChainValidity() == false) {
        throw "[1] checkChainValidity false";
    }

    smashingCoin.save();
    console.log(smashingCoin.blockchain.length);
}

main();
