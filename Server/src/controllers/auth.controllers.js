class Auth{
    async logged(req,res){
        try{
            const { token } = req.body;

            if(!token){
                return res
                    .json(false);
            }
            return res
                .json(true);
        }
        catch(err){
            console.log(err);
            return res
                .status(500);
        }
    }
}

const controllers = new Auth;

module.exports = controllers;