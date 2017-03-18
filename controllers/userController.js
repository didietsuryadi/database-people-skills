const User = require('../models/user');

module.exports = {
  createUser: function(req,res){
    User.findOne({username:req.body.username}, function (data) {
      if(data){
        res.send('username is already exist, please use other name')
      }else{
        User.create({
          username: req.body.username,
          skills: []
        }, function (err, data) {
          if (err) {
            res.json(err)
          }else{
            res.json(data)
          }
        })
      }
    })
  }
  deleteUser: function(req,res){
    User.findOneAndRemove({username:req.params.username}, function(err, data){
      if (err){
        res.send(err)
      }else{
        res.send(data)
      }
    })
  },
  readUsers: function(req,res){
    User.find({}, function(err,data){
      if(err){
        res.json(err)
      }else{
        res.json(data)
      }
    })
  },
  readUser: function(req,res){
    User.findOne({username:req.params.username}, function(err,data){
      if(err){
        res.json(err)
      }else{
        res.json(data)
      }
    })
  },
  getSkills: function(req,res){
    User.findOne({username: req.params.username})
    .then(function(data){
      res.json(data[0].skills)
    })
  },
  addSkill: function(req,res){
    User.findOne({username: req.params.username})
    .then(function(data){
      let skillName = []
      data.skills.forEach(function(skill){
        skillName.push(skill.name)
      })
      if(skillName.indexOf(req.body.skillname) >= 0){
        res.send('skill is already exist')
      } else if(req.body.score > 10) {
        res.send('score less than 10')
      } else if(req.body.score < 1) {
        res.send('score more than 1')
      } else {
        User.findOneAndUpdate({username:req.params.username},{
          $push:{skills:{name:req.body.skillname,score: req.body.score}}
        },{new: true})
        .then(function(data){
          res.json(data)
        })
      }
    })
  },
  removeSkill: function(req,res){
    User.findOne({username: req.params.username})
    .then(function(data){
      let skillName = []
      data.skills.forEach(function(skill){
        skillName.push(skill.name)
      })
      let index = skillName.indexOf(req.body.skillname)
      if(index == -1){
        res.send('skill is not exist')
      } else {
        User.findOneAndUpdate({username:req.params.username},{
          $pull:{skills:{name:req.body.skillname}}
        },{new: true})
        .then(function(data){
          res.json(data)
        })
      }
    })
  }
}
