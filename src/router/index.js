const {Router} = require('express');
const router = Router();
const todoListService = require('../service/todoListService');

// router.use((req, res, next) => next());

router.post('', async (req, res) => {
    try {
        await todoListService.save(req.body);
        await res.json({
            status: 201,
            message: 'add success'
        })
    } catch (e) {
        await res.json({
            status: 400,
            message: e
        })
    }
});

router.get('', async (req, res) => {
    const content = req.query.content;
    let result;
    if (content) {
        result = await todoListService.findByContent(content);
    } else {
        result = await todoListService.findAllByFinished();
    }
    if (result) {
        res.json({
            status: 200,
            data: result.reverse()
        })
    } else {
        res.json({
            status: 400,
            message: 'can not find'
        })
    }
});

router.get('/finished', async (req, res) => {
    const result = await todoListService.findAll();
    if (result) {
        res.json({
            status: 200,
            data: result.reverse()
        })
    } else {
        res.json({
            status: 400,
            message: 'can not find'
        })
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await todoListService.delete(id);
        await res.json({
            status: 200,
            message: 'delete success'
        })
    } catch (e) {
        await res.json({
            status: 400,
            message: 'can not delete'
        })
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await todoListService.update(id);
        await res.json({
            status: 200,
            message: 'update success',
        })
    } catch (e) {
        await res.json({
            status: 400,
            message: 'update fail'
        })
    }
});

module.exports = router;

