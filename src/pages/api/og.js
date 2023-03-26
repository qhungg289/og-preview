import axios from "axios";
import * as cheerio from "cheerio";

export default function handler(req, res) {
	if (req.method == "POST") {
		if (!req.body.url) {
			res.status(400).json({ message: "URL is required" });
		}

		axios
			.get(req.body.url)
			.then((d) => {
				const $ = cheerio.load(d.data);

				const ogTitle = $('meta[property="og:title"]').attr("content");
				const ogDescription = $('meta[property="og:description"]').attr(
					"content",
				);
				const ogImage = $('meta[property="og:image"]').attr("content");

				res.status(200).json({ ogTitle, ogDescription, ogImage });
			})
			.catch((_) =>
				res
					.status(400)
					.json({ message: "Can't parse the HTML from the given URL" }),
			);
	}
}
