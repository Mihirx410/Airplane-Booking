import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const { from, to, date, passengers } = req.body;
  if (!from || !to || !date || !passengers) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const booking = new Booking({
      user: req.user.id,
      from,
      to,
      date,
      passengers,
    });
    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(3);
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
    const { from, to, date, passengers } = req.body;
    if (from) booking.from = from;
    if (to) booking.to = to;
    if (date) booking.date = date;
    if (passengers) booking.passengers = passengers;
    await booking.save();
    res.json({ message: 'Booking updated', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
    await booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 