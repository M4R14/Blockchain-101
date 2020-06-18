const SHA256 = require('crypto-js/sha256');

export class Block {
    private index : number ;
    private timestamp : Date | string;
    private data : string | object;
    public precedingHash: string;
    public hash : string ;
    public nonce : number = 0;

    constructor(
        index: number,
        timestamp: Date | string,
        data : string | object,
        precedingHash : string =" "
    ){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();    
    }
    computeHash() : string {
        return SHA256([
            this.index,
            this.precedingHash,
            this.timestamp,
            JSON.stringify(this.data),
            this.nonce
        ].join('|')).toString();
    }
    proofOfWork(difficulty : number){
        while(this.hash.substring(0, difficulty) !==Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.computeHash();
            // console.log('hash... '+ this.hash);
        }        
    } 
}

