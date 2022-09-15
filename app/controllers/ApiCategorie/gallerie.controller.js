const db = require("../../models");
const Op = db.Sequelize.Op;


// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Produit = db.produit;
const Gallerie = db.gallerie

// main work

// 1. create Image

const addImage = async (req, res, next) => {
  let info = {
    produit_id: req.body.produit_id,
    nomImage: req.body.nomImage,
    description: req.body.description,
}
  if(req.file) info.image = req.file.path;
   await Gallerie.create(info)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while creating the Image."
     });
   });
   console.log(info);
}


// 2. get all Images

const getAllImages = async (req, res) => {
  const nomImage = req.query.nomImage;
  var condition = nomImage ? { nomImage: { [Op.like]: `%${nomImage}%` } } : null;

    let univers = await Gallerie.findAll({where: condition}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Image."
      });
    });

}


// 3. get single Image

const getOneImage  = async (req, res) => {

    let id = req.params.id
    let univers  = await Gallerie.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Image with id=" + id
      });
    });

}



// 4. update Image

const updateImage = async (req, res) => {
  const id = req.params.id;

  await Gallerie.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Image was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Image with id=" + id
      });
    });
};


// 5. delete Image by id

const deleteImage = async (req, res) => {

  const id = req.params.id;

  Gallerie.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Image was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Image with id=" + id
      });
    });

}

// 5. delete all Images

const deleteAllImages = async (req, res) => {

    let id = req.params.id
    
    await Gallerie.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Images were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Images."
        });
      });

}



// 7. connect one to many relation Image and Product

const getImageProduct =  async (req, res) => {

    const id = req.params.id

    const data = await Gallerie.findOne({
        include: [{
            model: Product,
            as: 'product'
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
    addImage,
    getAllImages,
    getOneImage,
    updateImage,
    deleteImage,
    getImageProduct,
    upload
}