const { ai } = require('./AI/ai');
const { help_prefix } = require('./Help/help');

const { joinn } = require('./Music/join');
const { leavee } = require('./Music/leave');
const { nplayy } = require('./Music/nplay');
const { shuffle_prefix } = require('./Music/shuffle');
const { pause_music } = require('./Music/pause');
const { play_prefix } = require('./Music/play');
const { queue_prefix } = require('./Music/queue');
const { resume_prefix } = require('./Music/resume');
const { setloop_prefix } = require('./Music/setloop');
const { skip_prefix } = require('./Music/skip');
const { stop_prefix } = require('./Music/stop');

const { ping_prefix } = require('./Ultility/ping')
const { status_prefix } = require('./Ultility/status')

module.exports = {
    ai, help_prefix, joinn, leavee, nplayy, pause_music, play_prefix, resume_prefix, setloop_prefix, skip_prefix, stop_prefix, ping_prefix, status_prefix, queue_prefix, shuffle_prefix
}