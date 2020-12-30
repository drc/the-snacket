const db = require("../../db/connection");
const snacks = db.get("snacks");
const category = db.get("categories");

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET": {
            const results = await snacks.find({});
            res.status(200).json({ results });
            break;
        }
        case "POST": {
            const existingSnack = await snacks.findOne({
                name: req.body.name,
            });
            if (existingSnack) {
                const error = new Error(`${existingSnack.name} already exists`);
                res.status(409).send({
                    error: error.message,
                });
            } else {
                const existingCategory = await category.findOne({
                    name: req.body.category,
                });
                const newSnack = await snacks.insert({
                    name: req.body.name,
                    category: existingCategory._id || "",
                    updated: new Date(),
                });
                res.status(201).json(newSnack);
            }
            break;
        }
        default: {
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    }
    db.close();
};
