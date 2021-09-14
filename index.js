//index.js
const fs = require('fs');
const api = require('./api');
const { clientId, guildId, token } = require('./config.json')
const { Client, Intents } = require('discord.js');
const { userMention } = require('@discordjs/builders');

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'diferente'){
        await interaction.reply(`Desde que o ${'<@242712514444525568>'} voltou, ele esta diferente`);
    } else if (commandName==='buybtc'){
        let results = await api.depth('BTC_BRL');
        let bids = 'bids'
        let bidOrder = orderValues(getValues(bids,results))
        let bidOrderStringfy = JSON.stringify(bidOrder)
        await interaction.reply(`as ultimas 5 ordens de compra da moeda bitcoin em real foram:\n ${bidOrderStringfy}`)
    } else if (commandName==='sellbtc'){
        let results = await api.depth('BTC_BRL');
        let asks = 'asks'
        let askOrder = orderValues(getValues(asks,results))
        let askOrderStringfy = JSON.stringify(askOrder)
        await interaction.reply(`as ultimas 5 ordens de venda da moeda bitcoin em real foram:\n ${askOrderStringfy}`)
    } else if (commandName==='buyeth'){
        let results = await api.depth('ETH_BRL');
        let bids = 'bids'
        let bidOrder = orderValues(getValues(bids,results))
        let bidOrderStringfy = JSON.stringify(bidOrder)
        await interaction.reply(`as ultimas 5 ordens de compra da moeda ethereum em real foram:\n ${bidOrderStringfy}`)
    } else if (commandName==='selleth'){
        let results = await api.depth('ETH_BRL');
        let asks = 'asks'
        let askOrder = orderValues(getValues(asks,results))
        let askOrderStringfy = JSON.stringify(askOrder)
        await interaction.reply(`as ultimas 5 ordens de venda da moeda ethereum em real foram:\n ${askOrderStringfy}`)
    } else if (commandName==='buyada'){
        let results = await api.depth('ADA_BRL');
        let bids = 'bids'
        let bidOrder = orderValues(getValues(bids,results))
        let bidOrderStringfy = JSON.stringify(bidOrder)
        await interaction.reply(`as ultimas 5 ordens de compra da moeda ADA em real foram:\n ${bidOrderStringfy}`)
    } else if (commandName==='sellada'){
        let results = await api.depth('ADA_BRL');
        let asks = 'asks'
        let askOrder = orderValues(getValues(asks,results))
        let askOrderStringfy = JSON.stringify(askOrder)
        await interaction.reply(`as ultimas 5 ordens de venda da moeda ADA em real foram:\n ${askOrderStringfy}`)
    }    
});


client.on('messageCreate',message =>{
    let mention = '<@266767885693616139>'

    if (message.content === 'cringe'){
    message.channel.send(`${mention} POR FAVOR FELIUPE QUAL A COMP CRINGE`)
}   else if (message.content === 'buteco'){
    message.channel.send('Voleizinho 15h, quem fecha?')
}   else if (message.content === 'forças'){
    message.channel.send(`forças ${'<@242712514444525568>'} #prayForDede`)
}

})

client.login(token)



console.log('Iniciando monitoramento!');


function getValues (local, results){
    return dataList = results.data[local].map(function(x){
        return { 
            price:Number(x[0]),
            amount:Number(x[1])
        }
    })
};

function orderValues(dataList){
    return value = dataList.sort(function(a,b){
        return b.price-a.price
    })
};

function buyCripto(value, array){
    return array.some(e => { 
        return e.price <= value
    });

}

function sellCripto(value,array){
    return array.some(e => { 
        return e.price >= value
    });
}

const action = 'compra';
const valor = 250000;

// setInterval(async () => {   
//     let results = await api.depth();
//     let asks = 'asks'
//     let bids = 'bids'
//     let askOrder = orderValues(getValues(asks, results));
//     let bidOrder = orderValues(getValues(bids,results));
//     if (action === 'compra'){
//         console.log('entrou no if')
//         if (buyCripto(valor,askOrder) === true){
//             console.log('hora de comprar')
//         }

//     }else if(action ==='venda'){
//         console.log('entrou no else')
//         if (sellCripto(valor,bidOrder) === true){
//             console.log('hora de vender')
//         }

//     }; 
//     console.log('saiu do if')
    

// },process.env.CRAWLER_INTERVAL);

// ask = lowest price to sell, bid = the highest price do pay.  bid-ask bread