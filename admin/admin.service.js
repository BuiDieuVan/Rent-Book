const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//register admin
module.exports.registerAdmin = function(req,res,next){
    //get admin
    const admin = new Admin(req.body);
    admin.hash_password = bcrypt.hashSync(req.body.password,10);
    //save
    admin.save(function(err,newAdmin){
        if(err) {
            res.json({"code":false,
            message:"err to save"});
            return
        }
        newAdmin.hash_password=undefined
        res.json({message:'Save ok',data: newAdmin });
    })
};
//login
module.exports.loginAdmin = function(req,res) {
    const Adminname =req.body.Adminname;
    const password = req.body.password;
//find
 Admin.findOne({
        'Adminname':Adminname
}, function(err, admin){
    if(err,admin){
        if(!admin){
            res.json({
                data:err,
                message:'Admin is not exits'
            });
        }else if(admin&&
            admin.comparePassword(password)) {
                const payload={Adminname:admin.Adminname};
                const jwtToken = jwt.sign(payload,config.jwtSecret,{ expiresIn: 1 * 30 });
                console.log('jwtToken: ' +jwtToken);
                var jsonResponse = {'access_token': jwtToken, 'refresh_token': "xxxxx-xxx-xx-x"}
                res.json(jsonResponse)
            } else{
                res.json({error :'Login Error!'
                })
            }
    }
})

}