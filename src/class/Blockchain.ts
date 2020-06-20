import { Block } from "./Block"
import fs from 'fs';

export class Blockchain {
    blockchain : Block[] ;
    difficulty : number = 3;

    constructor() {
        this.blockchain = [this.startGenesisBlock()];     
    }
    
    startGenesisBlock() : Block{
        return new Block(0, "0", "Initial Block in the Chain", "0");
    }
    
    obtainLatestBlock() : Block{
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock : Block) : void {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        // newBlock.hash = newBlock.computeHash();   
        newBlock.proofOfWork(this.difficulty);     
        this.blockchain.push(newBlock);
    }

    checkChainValidity () {
        for(let i = 1; i < this.blockchain.length; i++){
            const currentBlock = this.blockchain[i];
            const precedingBlock= this.blockchain[i-1];

            if(currentBlock.hash !== currentBlock.computeHash()){
                return false;
            }

            if(currentBlock.precedingHash !== precedingBlock.hash) {
                return false;
            }
        }

        return true;
    }

    async load () {
        interface BlockRaw {
            index: number,
            timestamp: string,
            nonce: number,
            data: object,
            hash: string,
            precedingHash: string,
        }
        var contents =  await fs.readFileSync('blockchain.json')
        console.log(contents)
        const { difficulty, blockchain } = JSON.parse(contents.toString());
        this.difficulty = difficulty;

        const _blockchain = [];
        for (let index = 0; index < blockchain.length; index++) {
            const blockRaw : BlockRaw = blockchain[index];
            const block = new Block(blockRaw.index, blockRaw.timestamp, blockRaw.data);
            block.nonce = blockRaw.nonce
            block.hash = blockRaw.hash
            block.precedingHash = blockRaw.precedingHash
            
            _blockchain.push(block);
        }
        this.blockchain = _blockchain;
        console.log('Data read to file');
        console.log('Data read to file', this.blockchain.length);

        return true;
    }

    async save() {
        let data = JSON.stringify(this, null, 4);

        await fs.writeFileSync('blockchain.json', data);

        console.log('This is after the write call')
    }
}