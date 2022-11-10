const Summary  = require('../models/summary'); 

async function show (req, res) {
    try {
        const name = req.body.borough_name;
        const borough = await Summary.getOneByName(name) 
        res.json(borough);
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
}


module.exports = {
    show
}
