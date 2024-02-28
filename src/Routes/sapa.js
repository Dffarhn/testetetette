const { Router } = require('express');

const router = Router();

router.get('/:id', (req, res) => {
    const id = req.params.id
    res.status(200).send("dapa disini");
    console.log(id);
});

module.exports = router;
