const Summary  = require('../models/summaryModel'); 

async function show (req, res) {
    try {
        const name = req.params.borough;
        const borough = await Summary.getOneByName(name) 
        res.status(200).json(borough);
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
}


module.exports = {
    show
};
