const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "14a42012beaa4b69bf6390b6c0229c13"
});

const handleApiCall = () => (req, res) => {
	app.models
		.predict(
			Clarifai.FACE_DETECT_MODEL,
			// URL
			req.body.input
		)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json("API not working"));
};

const handleImage = db => (req, res) => {
	const { id } = req.body;
	db("users")
		.where("id", "=", id)
		.increment("entries", 1)
		.returning("entries")
		.then(entries => res.json(entries[0]))
		.catch(err => {
			res.status(400).json("unable to get entries");
		});
};

module.exports = {
	handleImage,
	handleApiCall
};
