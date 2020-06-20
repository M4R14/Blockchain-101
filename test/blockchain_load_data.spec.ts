import { Block } from "../src/class/Block";
import { Blockchain } from "../src/class/Blockchain";

const main = async () => {
    const smashingCoin = new Blockchain();

    // smashingCoin.addNewBlock(new Block(2, new Date, {
    //     sender: "Vitaly Friedman",
    //     recipient: "Ricardo Gimenes",
    //     quantity: 1111,
    // }));
    // await smashingCoin.save();

    await smashingCoin.load();

    console.log(smashingCoin.blockchain.length);

    if (smashingCoin.checkChainValidity() == false) {
        throw "[0] checkChainValidity false";
    }

    smashingCoin.addNewBlock(new Block(2, "2020-01-01", {
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
