const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldMessage, newMessage) => {
	try {
		const auditLogs = await oldMessage.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, {
			oldMessage,
			newMessage,
			action: "MESSAGE_UPDATE",
			actionType: "UPDATE",
		});
	} catch (err) {
		console.error(err);
	}
};
