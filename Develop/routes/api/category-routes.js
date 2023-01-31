const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const response = await Category.findAll({ include: [{ model: Product }] });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { category_name } = req.body;
    const response = await Category.create({ category_name });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Category.update(req.body, { where: { id } });
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Category.destroy({ where: { id } });

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
