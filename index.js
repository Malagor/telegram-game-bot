require('dotenv').config();

const TelegramApi = require('node-telegram-bot-api');
const {commandsArray, COMMANDS} = require("./commands");
const {game} = require("./game");
const {newGameOptions, keyboardOptions} = require("./keyboards");


const bot = new TelegramApi(process.env.BOT_TOKEN, {polling: true});

const chats = {};

bot.setMyCommands(commandsArray);

bot.on('callback_query', async msg => {
	const {data, message} = msg;
	const chatId = message.chat.id;

	if (data === '/newGame') {
		return game(bot, chats, chatId);
	}

	const correctNumber = chats[chatId];
	let isEndGame = false;

	let text = `Ты выбрал ${data}.`
	if (Number(data) === correctNumber) {
		text += ` И ТЫ УГАДАЛ. Поздравляю!!!`;
		isEndGame = true;
	} else {
		text += data > correctNumber ? ' Больше.' : ' Меньше.'
	}

	if (isEndGame) {
		await bot.sendMessage(chatId, text);
		await bot.sendMessage(chatId, 'Начать новую игру?', newGameOptions);
	} else {
		await bot.sendMessage(chatId, text, keyboardOptions);

	}
})

bot.on('message', async msg => {
	const {text, chat, from, entities} = msg;
	const {id: chatId} = chat;
	const {first_name, last_name} = from;

	const isCommand = entities && entities[0].type === 'bot_command';

	if (isCommand) {
		switch (text) {
			case COMMANDS.start:
				await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ff6/4b6/ff64b611-aa7c-3603-b73c-7cd86d4b71dc/2.jpg')
				await bot.sendMessage(chatId, `Добро пожаловать ${first_name} ${last_name}`);
				break;
			case COMMANDS.rules:
				await bot.sendMessage(chatId, `Правила`);
				await bot.sendMessage(chatId, `Я загадаю цифру от 0 до 9, а ты попробуй ее угадать`);
				break;
			case COMMANDS.game:
				await game(bot, chats, chatId);
				break;
			default:
		}
	} else {
		await bot.sendMessage(chatId, `Ты написали ${text}`);
	}
})
