const db = require("../../models");
const Op = db.Sequelize.Op;


// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Produit = db.produit;
const Promotion = db.promotion

// main work

// 1. create Promotion

const addPromotion = async (req, res, next) => {
  let info = {
    produit_id: req.body.produit_id,
    nomPromos: req.body.nomPromos,
    description: req.body.description,
    prixPromo1: req.body.prixPromo1,
    prixPromo2: req.body.prixPromo2,
}
  if(req.file) info.image = req.file.path;
   await Promotion.create(info)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while creating the Promotion."
     });
   });
   console.log(univers);
}


// 2. get all Promotions

const getAllPromotions = async (req, res) => {
  const nomPromotion = req.query.nomPromotion;
  var condition = nomPromotion ? { nomPromotion: { [Op.like]: `%${nomPromotion}%` } } : null;

    let univers = await Promotion.findAll({where: condition}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Promotion."
      });
    });

}


// 3. get single Promotion

const getOnePromotion  = async (req, res) => {

    let id = req.params.id
    let univers  = await Promotion.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Promotion with id=" + id
      });
    });

}



// 4. update Promotion

const updatePromotion = async (req, res) => {
  const id = req.params.id;

  await Promotion.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Promotion was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Promotion with id=${id}. Maybe Promotion was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Promotion with id=" + id
      });
    });
};


// 5. delete Promotion by id

const deletePromotion = async (req, res) => {

  const id = req.params.id;

  Promotion.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Promotion was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Promotion with id=${id}. Maybe Promotion was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Promotion with id=" + id
      });
    });

}

// 5. delete all Promotions

const deleteAllSousCategoriePromotions = async (req, res) => {

    let id = req.params.id
    
    await Promotion.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Promotions were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Promotions."
        });
      });

}



// 7. connect one to many relation Promotion and Produit

const getPromotionProduit =  async (req, res) => {

    const id = req.params.id

    const data = await Promotion.findOne({
        include: [{
            model: Produit,
            as: 'produit'
        }],
        where: { id: id }
    })

    res.status(200).send(data)
}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


module.exports = {
    addPromotion,
    getAllPromotions,
    getOnePromotion,
    updatePromotion,
    deletePromotion,
    getPromotionProduit,
    upload
}