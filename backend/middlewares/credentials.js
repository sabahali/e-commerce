const credentials = (req,res,next) =>{
    res.header('Access-Control-Allow-Credentials',true);
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept ');
    next()
}

module.exports = credentials