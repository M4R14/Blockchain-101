import { Blockchain } from "./class/Blockchain";
import { Block } from "./class/Block";

const axios = require('axios');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
// const multer = require('multer') // v1.0.5
// const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = process.env.NODE_PORT || 3000

const ID = () : string => '_' + Math.random().toString(36).substr(2, 9);

class Friend {
    host: string
    protocol = 'http://'

    constructor(host: string){
        this.host = host;
    }

    lastUpdate () {
        return axios.get(this.protocol + this.host + '/')
            .then((response: { data: JSON; }) => response.data)
            .then((data: { lastUpdate: any; }) => data.lastUpdate)
    } 

    pushBlock (block : Block) {
        return axios.post(this.protocol + this.host + '/push-block', {
            block: AppData.block,
        })
            
    }
}

interface AppData {
    friendship: string[];
    blockchain: Blockchain;
    block: Block | null;
    log: any[];
}

console.log("FRIEND_HOSTNAME", process.env.FRIEND_HOSTNAME);

const AppData : AppData = {
    friendship: [
        process.env.FRIEND_HOSTNAME || ''
    ],
    block: null,
    blockchain: new Blockchain,
    log: [],
}

app.get('/', (req: any, res: any) => {
    return res.json({
        ...AppData,
        lastUpdate: AppData.blockchain.obtainLatestBlock().timestamp,
        checkChainValidity: AppData.blockchain.checkChainValidity()
    });
});

app.post('/friendship', (req: any, res: any) => {
    AppData.friendship.push(req.body.host)
    return res.json();
})

app.get('/blockchain', (req: any, res: any) => {
    AppData.block = req.body.block;
    return res.json(AppData.blockchain);
})

app.get('/mine', (req: any, res: any) => {
    if (AppData.block) {
        const block = Object.assign(new Block('', '', ''), AppData.block)
        AppData.block = null
        AppData.blockchain.addNewBlock(block)
        
        // AppData.friendship.forEach(hostname => {
        //     const friend = new Friend(hostname);
        //     friend.pushBlock(block.getIndex())
        // });

        return res.json(AppData.blockchain);
    }
    return res.json({ msg: 'null' });
})

app.post('/push-block', (req: any, res: any) => {
    AppData.log.push([
        '/push-block',
        req.body
    ]) 
    AppData.block = req.body.block;
    return res.json({ msg: 'ok!' });
})

app.post('/block', (req: any, res: any) => {
    const newBlock = new Block(
        ID(),
        new Date,
        "Hellow"
    );
    AppData.block = newBlock;
    AppData.friendship.forEach(hostname => {
        const friend = new Friend(hostname);
        AppData.log.push([
            'pushBlock()',
            newBlock
        ]) 
        friend.pushBlock(newBlock)
    });

    return res.json(AppData.block);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))