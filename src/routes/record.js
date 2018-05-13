import express from 'express';
import db from '../models';

const router = express.Router();
const { Record } = db;

/*
 ***************************************
 * Post record
 * *************************************
*/
router.post('/records', async (req, res) => {
  // Request Validation
  req.check('name', 'Name field is empty.').notEmpty();
  req.check('sid', 'Sensor ID field is empty.').notEmpty();
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

  return Record.sync().then(async () => {
    const recordData = req.body;
    try {
      const postRecord = await Record.create(recordData);
      if (!postRecord) {
        return res.json({
          success: false,
          message: "Record couldn't be posted."
        });
      }
      return res.json({
        success: true,
        message: 'Record successfully registered.'
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Record couldn't be posted.",
        error: e
      });
    }
  });
});

/*
 ***************************************
 * Get Records List
 * *************************************
*/
router.get('/records', (req, res) =>
  Record.sync().then(async () => {
    try {
      const records = await Record.findAll();
      if (!records) {
        return res.json({
          success: false,
          message: "Records couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'Records successfully fetched.',
        data: records
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Records couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * Get Single Records
 * *************************************
*/
router.get('/records/:id', (req, res) =>
  Record.sync().then(async () => {
    try {
      const records = await Record.findOne({ where: { id: req.params.id } });
      if (!records) {
        return res.json({
          success: false,
          message: "Record couldn't be fetched."
        });
      }
      return res.json({
        success: true,
        message: 'Record successfully fetched.',
        data: records
      });
    } catch (e) {
      return res.json({
        success: false,
        message: "Record couldn't be fetched.",
        error: e
      });
    }
  })
);

/*
 ***************************************
 * delete record
 * *************************************
*/
router.delete('/records/:id', async (req, res) => {
  try {
    const deleteRecord = await Record.destroy({ where: { id: req.params.id } });
    if (!deleteRecord) {
      return res.json({
        success: false,
        message: "Record couldn't be deleted."
      });
    }
    return res.json({
      success: true,
      message: 'Record successfully deleted.'
    });
  } catch (e) {
    return res.json({
      success: false,
      message: "Record couldn't be deleted.",
      error: e
    });
  }
});

/*
 ***************************************
 * Update record
 * *************************************
*/
router.put('/records/:id', async (req, res) => {
  try {
    const updatedRecord = await Record.update(
      { firstname: 'Milan Poudel' },
      { where: { id: req.params.id } }
    );
    if (!updatedRecord) {
      return res.json({
        success: false,
        message: "Record couldn't be updated."
      });
    }
    return Record.findOne({ where: { id: req.params.id } }).then(record =>
      res.json({
        success: true,
        message: 'Record successfully updated.',
        data: record
      })
    );
  } catch (e) {
    return res.json({
      success: false,
      message: "Record couldn't be updated.",
      error: e
    });
  }
});

export default router;
