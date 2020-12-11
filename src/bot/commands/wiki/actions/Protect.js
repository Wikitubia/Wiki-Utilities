const i18n = require('i18next');
const Action = require('./Action');

class ProtectAction extends Action {
    constructor(data) {
        super(data);
        this.message = data.message;
        this.args = data.args;
    }

    async exec() {
        const initMessage = await this.message.util.send(i18n.t('commands.protect.protecting'));

        try {
            await this.bot.login(this.creds.username, this.creds.password);

            await this.bot.protect({
                title: this.args.page,
                expiry: this.args.expiry,
                protections: {
                    edit: this.args.usergroup
                },
                reason: this.args.reason
            });
        } catch (err) {
            return initMessage.edit(err.message);
        }

        return initMessage.edit(i18n.t('commands.protect.success'));
    }
}

module.exports = ProtectAction;