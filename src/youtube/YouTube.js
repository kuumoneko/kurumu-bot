const Video = require("./Video");
const snekfetch = require("snekfetch");
const url = require("url");
var _ = require("lodash");

class YouTube {

	constructor(key) {
		this.key = key;
		this.base = "https://www.googleapis.com/youtube/v3"
	}

	async getVideoByID(id) {
		const part = "contentDetails,snippet";
		try {
			const temp = `${this.base}/videos?part=${part}&key=${this.key}&id=${id}`
			const res = await snekfetch.get(temp);
			return new Video(JSON.parse(res.text));
		} catch (err) {
			throw new Error("Couldn't retrieve video");
		}

	}

	async getVideo(link) {
		const parsed = url.parse(link, true);
		const id = parsed.query.v;
		if (!!id && this.testID(id)) return await this.getVideoByID(id);
		else throw new Error("Cannot resolve video ID");
	}
	/**
	 * 
	 * @param {string} query 
	 * @returns 
	 */
	async searchVideos(query) {
		const max = 10;
		const part = "snippet";
		const type = "video";
		query = query.replace(/ /g , '+')
		try {
			const temp = `${this.base}/search?part=${part}&key=${this.key}&maxResults=${max}&type=${type}&q=${query}`
			const res = await snekfetch.get(temp);
			const text = JSON.parse(res.text)

			var videos = await Promise.all(text.items.map(async item => {
				try {
					return await this.getVideoByID(item.id.videoId);
				} catch (err) {
					return null;
				}
			}));

			// return await this.getVideoByID(JSON.parse(res.text).items[0].id.videoId);
		} catch (err) {
			throw new Error("Couldn't retrieve video");
		}
		return videos.filter(v => !!v)
	}

	async getPlaylistByID(id) {
		const max = 50;
		const part = "snippet";
		var vids = []
		try {
			var temp = `${this.base}/playlistItems?part=${part}&key=${this.key}&playlistId=${id}&maxResults=${max}`
			var res = await snekfetch.get(temp);
			var kuumo = JSON.parse(res.text)
			var pagetoken = _.get(kuumo, 'nextPageToken', "None");
			// var videos;

			while (pagetoken !== "None") {
				var videos = await Promise.all(kuumo.items.map(async item => {
					try {
						return await this.getVideoByID(item.snippet.resourceId.videoId);
					} catch (err) {
						return null;
					}
				}
					

				));

				videos.forEach(item => {
						vids.push(item)
					})

				temp = `${this.base}/playlistItems?part=${part}&key=${this.key}&playlistId=${id}&maxResults=${max}&pageToken=${pagetoken}`
				res = await snekfetch.get(temp);
				kuumo = JSON.parse(res.text)
				pagetoken = _.get(kuumo, 'nextPageToken', "None");
			}

			var videos = await Promise.all(kuumo.items.map(async item => {
				try {
					return await this.getVideoByID(item.snippet.resourceId.videoId);
				} catch (err) {
					return null;
				}
			},
				
			));
			videos.forEach(item => {
								vids.push(item)
							})

		} catch (err) {
			throw new Error(`Couldn't retrieve playlist , error: ${err}`);
		}
		return vids.filter(v => !!v);
	}
	// https://youtube.com/playlist?list=
	async getPlaylist(link) {
		const parsed = url.parse(link, true);
		const id = parsed.query.list;
		if (!!id && this.testID(id)) return await this.getPlaylistByID(id);
		else throw new Error("Cannot resolve playlist ID");
	}

	testID(id) {
		return /[A-Za-z0-9_-]+/.test(id);
	}
}

module.exports = YouTube;
