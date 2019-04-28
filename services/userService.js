const {User} = require('../models/user')
const {Role} = require('../models/role')
const {Area} = require('../models/area')

const {Sequelize} = require('../config/sequelize')
const Op = Sequelize.Op

var UserService =
{
    show_users : function ()
    {
        return User.findAll({raw : true,
            attributes : ['lastName', 'firstname']
            // , where : {
            //     [Op.and] : {id : 1}
            //}
            , include :[
                {model: Role, attributes : ['descripction', 'state']},
                {model: Area, attributes : ['descripction']}
            
            ]  })
            .then((users)=>
            {
                return users
            })
            .catch((err)=>
            {
                return  {
                    error : true,
                    message :err
                }
            })

 
        
    },

    show_user : function(userId)
    {
        return User.findByPk(userId, { raw : true})
        .then((user)=>
        {
            console.log(user);
            return user
        })
        .catch((err)=>
        {
            console.log(err);  
            return err
        })
    },

    create_user : async function()
    {
        var valor = 0;
        for (let i = 0; i < 500; i++) 
        {
           
            const newUser = User.build(
                {
                    firstName : 'Saul '+i,
                    lastName  : 'Ramirez '+i
                })
               await newUser.save()
                .then(()=>
                {
                    valor = valor+i
                })
                .catch((err)=>
                {
                    throw new err
                })

        }

        return valor
    
    }


}

module.exports = {UserService}