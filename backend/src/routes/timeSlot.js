const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');
const auth = require('../middleware/auth');

// Save time slots
router.post('/timeslots', auth, async (req, res) => {
  try {
    const { selectedTimes, groupId } = req.body;

    // Check if user already has time slots for this group
    let timeSlot = await TimeSlot.findOne({ 
      userId: req.user.id,
      groupId
    });

    if (timeSlot) {
      // Update existing time slots
      timeSlot.selectedTimes = selectedTimes;
      await timeSlot.save();
    } else {
      // Create new time slots
      timeSlot = new TimeSlot({
        userId: req.user.id,
        groupId,
        selectedTimes
      });
      await timeSlot.save();
    }

    res.status(201).json(timeSlot);
  } catch (error) {
    console.error('Error saving time slots:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get group's time slots
router.get('/groups/:groupId/timeslots', auth, async (req, res) => {
  try {
    const timeSlots = await TimeSlot.find({ 
      groupId: req.params.groupId 
    }).populate('userId', 'name');
    res.json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;