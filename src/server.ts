import { Blockchain } from "./class/Blockchain";
import { Block } from "./class/Block";
const axios = require('axios');
const express = require('express')
const app = express();

const port = process.env.NODE_PORT || 3000

const ID = () : string => '_' + Math.random().toString(36).substr(2, 9);

interface AppData {
    friendship: String[];
    blockchain: Blockchain;
    block: Block | null;
}

const AppData : AppData = {
    friendship: [],
    block: null,
    blockchain: new Blockchain
}

app.get('/', (req: any, res: any) => {
    return res.json({
        ...AppData,
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

app.post('/push-block', (req: any, res: any) => {
    AppData.block = req.body.block;
    return res.json({ msg: 'ok!' });
})

app.post('/block', (req: any, res: any) => {
    AppData.block = new Block(ID(), new Date, "Hellow");

    AppData.friendship.forEach(friend => {
        axios.post(friend + '/push-block', {
            block: AppData.block,
        }).then(function (response: any) {
                // handle success
                console.log(response);
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    });

    return res.json(AppData.block);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))