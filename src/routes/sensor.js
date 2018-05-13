import express from 'express';
import db from '../models';

const router = express.Router();
const { Sensor } = db;

/*
 ***************************************
 * Post sensor
 * *************************************
*/
router.post('/sensors', async (req, res) => {
  // Request Validation
  req.check('name', 'Name field is empty.').notEmpty();
  req.check('mid', 'Microcontroller ID field is empty.').notEmpty();
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

  return Sensor.sync().then(async () => {
    const sensorData = req.body;
    try {
      const postSensor = await Sensor.create(sensorData);
      if (!postSensor) {
        return res.json({
          success: false,
          message: "Sensor couldn't be posted."
        });
      }
      return res.json({
        success: true,
        message: 'Sensor successfully registered.'
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Sensor couldn't be posted.",
        error: e
      });
    }
  });
});

/*
 ***************************************
 * Get Sensors List
 * *************************************
*/
router.get('/sensors', (req, res) =>
  Sensor.sync().then(async () => {
    try {
      const sensors = await Sensor.findAll();
      if (!sensors) {
        return res.json({
          success: false,
          message: "Sensors couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'Sensors successfully fetched.',
        data: sensors
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Sensors couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * Get Single Sensors
 * *************************************
*/
router.get('/sensors/:id', (req, res) =>
  Sensor.sync().then(async () => {
    try {
      const sensors = await Sensor.findOne({ where: { id: req.params.id } });
      if (!sensors) {
        return res.json({
          success: false,
          message: "Sensor couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'Sensor successfully fetched.',
        data: sensors
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Sensor couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * delete sensor
 * *************************************
*/
router.delete('/sensors/:id', async (req, res) => {
  try {
    const deleteSensor = await Sensor.destroy({ where: { id: req.params.id } });
    if (!deleteSensor) {
      return res.json({
        success: false,
        message: "Sensor couldn't be deleted."
      });
    }
    return res.json({
      success: true,
      message: 'Sensor successfully deleted.'
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "Sensor couldn't be deleted.",
      error: e
    });
  }
});

/*
 ***************************************
 * Update sensor
 * *************************************
*/
router.put('/sensors/:id', async (req, res) => {
  try {
    const updatedSensor = await Sensor.update(
      { firstname: 'Milan Poudel' },
      { where: { id: req.params.id } }
    );
    if (!updatedSensor) {
      return res.json({
        success: false,
        message: "Sensor couldn't be updated."
      });
    }
    return Sensor.findOne({ where: { id: req.params.id } }).then(sensor =>
      res.json({
        success: true,
        message: 'Sensor successfully updated.',
        data: sensor
      })
    );
  } catch (e) {
    return res.json({
      success: false,
      message: "Sensor couldn't be updated.",
      error: e
    });
  }
});

export default router;
