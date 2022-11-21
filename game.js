const {keyboardOptions} =require("./keyboards");

/**
 *
 * @param bot
 * @param chats
 * @param chatId
 * @returns {Promise<void>}
 */
async function game(bot, chats, chatId) {
	await bot.sendMessage(chatId, `Игра началась`);
	const randomNumber = Math.floor(Math.random() * 10);
	chats[chatId] = randomNumber;
	console.log('randomNumber', randomNumber);
	await bot.sendMessage(chatId, `Твой вариант`, keyboardOptions);
}

module.exports = {
	game: game
}
