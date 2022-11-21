const COMMANDS = {
	start: '/start',
	rules: '/rules',
	game: '/game',

}

const commandsArray = [
	{ command: COMMANDS.start, description: 'Начальное приветствие'},
	{ command: COMMANDS.rules, description: 'Правила'},
	{ command: COMMANDS.game, description: 'Начать игру'},
]

module.exports = {
	COMMANDS,
	commandsArray
}
