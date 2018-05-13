import express from 'express';
import db from '../models';

const router = express.Router();
const { MicroController } = db;

/*
 ***************************************
 * Post microcontroller
 * *************************************
*/
router.post('/microcontrollers', async (req, res) => {
  // Request Validation
  req.check('name', 'Name field is empty.').notEmpty();
  req.check('gid', 'Greenhouse ID field is empty.').notEmpty();
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

  return MicroController.sync().then(async () => {
    const microcontrollerData = req.body;
    try {
      const postMicroController = await MicroController.create(microcontrollerData);
      if (!postMicroController) {
        return res.json({
          success: false,
          message: "MicroController couldn't be posted."
        });
      }
      return res.json({
        success: true,
        message: 'MicroController successfully registered.'
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "MicroController couldn't be posted.",
        error: e
      });
    }
  });
});

/*
 ***************************************
 * Get MicroControllers List
 * *************************************
*/
router.get('/microcontrollers', (req, res) =>
  MicroController.sync().then(async () => {
    try {
      const microcontrollers = await MicroController.findAll();
      if (!microcontrollers) {
        return res.json({
          success: false,
          message: "MicroControllers couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'MicroControllers successfully fetched.',
        data: microcontrollers
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "MicroControllers couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * Get Single MicroControllers
 * *************************************
*/
router.get('/microcontrollers/:id', (req, res) =>
  MicroController.sync().then(async () => {
    try {
      const microcontrollers = await MicroController.findOne({ where: { id: req.params.id } });
      if (!microcontrollers) {
        return res.json({
          success: false,
          message: "MicroController couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'MicroController successfully fetched.',
        data: microcontrollers
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "MicroController couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * delete microcontroller
 * *************************************
*/
router.delete('/microcontrollers/:id', async (req, res) => {
  try {
    const deleteMicroController = await MicroController.destroy({ where: { id: req.params.id } });
    if (!deleteMicroController) {
      return res.json({
        success: false,
        message: "MicroController couldn't be deleted."
      });
    }
    return res.json({
      success: true,
      message: 'MicroController successfully deleted.'
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "MicroController couldn't be deleted.",
      error: e
    });
  }
});

/*
 ***************************************
 * Update microcontroller
 * *************************************
*/
router.put('/microcontrollers/:id', async (req, res) => {
  try {
    const updatedMicroController = await MicroController.update(
      { firstname: 'Milan Poudel' },
      { where: { id: req.params.id } }
    );
    if (!updatedMicroController) {
      return res.json({
        success: false,
        message: "MicroController couldn't be updated."
      });
    }
    return MicroController.findOne({ where: { id: req.params.id } }).then(microcontroller =>
      res.json({
        success: true,
        message: 'MicroController successfully updated.',
        data: microcontroller
      })
    );
  } catch (e) {
    return res.json({
      success: false,
      message: "MicroController couldn't be updated.",
      error: e
    });
  }
});

export default router;
