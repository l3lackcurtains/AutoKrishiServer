import express from 'express';
import db from '../models';

const router = express.Router();
const { Greenhouse } = db;

/*
 ***************************************
 * Post greenhouse
 * *************************************
*/
router.post('/greenhouses', async (req, res) => {
  // Request Validation
  req.check('name', 'Name field is empty.').notEmpty();
  req.check('uid', 'User ID field is empty.').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const messages = [];
    errors.forEach(error => {
      messages.push(error.msg);
    });
    const newErrors = errors.map(err => `${err.msg}`);
    return res.json({
      success: false,
      message: 'Something went wrong.',
      errors: newErrors
    });
  }

  return Greenhouse.sync().then(async () => {
    const greenhouseData = req.body;
    try {
      const postGreenhouse = await Greenhouse.create(greenhouseData);
      if (!postGreenhouse) {
        return res.json({
          success: false,
          message: "Greenhouse couldn't be posted."
        });
      }

      return res.json({
        success: true,
        message: 'Greenhouse successfully registered.'
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Greenhouse couldn't be posted.",
        error: e
      });
    }
  });
});

/*
 ***************************************
 * Get Greenhouses List
 * *************************************
*/
router.get('/greenhouses', (req, res) =>
  Greenhouse.sync().then(async () => {
    try {
      const greenhouses = await Greenhouse.findAll();
      if (!greenhouses) {
        return res.json({
          success: false,
          message: "Greenhouses couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'Greenhouses successfully fetched.',
        data: greenhouses
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Greenhouses couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * Get Single Greenhouses
 * *************************************
*/
router.get('/greenhouses/:id', (req, res) =>
  Greenhouse.sync().then(async () => {
    try {
      const greenhouses = await Greenhouse.findOne({ where: { id: req.params.id } });
      if (!greenhouses) {
        return res.json({
          success: false,
          message: "Greenhouse couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'Greenhouse successfully fetched.',
        data: greenhouses
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Greenhouse couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * delete greenhouse
 * *************************************
*/
router.delete('/greenhouses/:id', async (req, res) => {
  try {
    const deleteGreenhouse = await Greenhouse.destroy({ where: { id: req.params.id } });
    if (!deleteGreenhouse) {
      return res.json({
        success: false,
        message: "Greenhouse couldn't be deleted."
      });
    }
    return res.json({
      success: true,
      message: 'Greenhouse successfully deleted.'
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "Greenhouse couldn't be deleted.",
      error: e
    });
  }
});

/*
 ***************************************
 * Update greenhouse
 * *************************************
*/
router.put('/greenhouses/:id', async (req, res) => {
  try {
    const updatedGreenhouse = await Greenhouse.update(
      { firstname: 'Milan Poudel' },
      { where: { id: req.params.id } }
    );
    if (!updatedGreenhouse) {
      return res.json({
        success: false,
        message: "Greenhouse couldn't be updated."
      });
    }
    return Greenhouse.findOne({ where: { id: req.params.id } }).then(greenhouse =>
      res.json({
        success: true,
        message: 'Greenhouse successfully updated.',
        data: greenhouse
      })
    );
  } catch (e) {
    return res.json({
      success: false,
      message: "Greenhouse couldn't be updated.",
      error: e
    });
  }
});

export default router;
