const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const response = await Tag.findAll({
      include: [{ model: Product, as: "productTag" }],
    });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Tag.findOne({
      where: { id },
      include: [
        {
          model: Product,
          as: "productTag",
        },
      ],
    });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { tag_name } = req.body;
    const response = await Tag.create({
      tag_name,
    });

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Tag.update(req.body, { where: { id } });

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Tag.destroy({ where: { id } });

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
