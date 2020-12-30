const db = require("../../db/connection");
const category = db.get("categories");

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET": {
            const results = await category.find({});
            res.status(200).json({ results });
            break;
        }
        default: {
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    }
    db.close();
};
