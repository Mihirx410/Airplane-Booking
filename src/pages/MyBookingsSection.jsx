import React, { useState } from 'react';
import axios from 'axios';
import ConfirmModal from '../components/ConfirmModal';

export default function MyBookingsSection({ onRequireLogin = () => {}, bookings = [], loading = false, error = '', onBookingChange = () => {} }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ from: '', to: '', date: '', passengers: 1 });
  const [actionMsg, setActionMsg] = useState('');
  const [actionType, setActionType] = useState('success');
  const [deleteId, setDeleteId] = useState(null);

  const startEdit = (b) => {
    setEditingId(b._id);
    setEditForm({ from: b.from, to: b.to, date: b.date, passengers: b.passengers });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ from: '', to: '', date: '', passengers: 1 });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActionType('success');
      setActionMsg('Booking updated!');
      setEditingId(null);
      onBookingChange();
    } catch (err) {
      setActionType('error');
      setActionMsg(err.response?.data?.message || 'Update failed.');
    }
    setTimeout(() => setActionMsg(''), 2500);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActionType('success');
      setActionMsg('Booking deleted!');
      onBookingChange();
    } catch (err) {
      setActionType('error');
      setActionMsg(err.response?.data?.message || 'Delete failed.');
    }
    setDeleteId(null);
    setTimeout(() => setActionMsg(''), 2500);
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto" id="mybookings">
      <h2 className="text-3xl font-bold mb-8 text-center">My Bookings</h2>
      <ConfirmModal
        open={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        message="Are you sure you want to delete this booking?"
      />
      {actionMsg && (
        <div className={`fixed top-28 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-center transition-all
          ${actionType === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}
        >
          {actionMsg}
        </div>
      )}
      {loading ? (
        <div className="text-center text-[var(--muted-text)]">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.length === 0 ? (
            <div className="text-[var(--muted-text)] text-center col-span-2">No bookings yet.</div>
          ) : (
            bookings.map((b, i) => (
              <div key={b._id || i} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-blue-100 relative overflow-hidden">
                {editingId === b._id ? (
                  <form onSubmit={e => handleEditSubmit(e, b._id)} className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <input name="from" value={editForm.from} onChange={handleEditChange} required className="flex-1 px-2 py-1 rounded border" />
                      <span className="mx-2 text-gray-400">→</span>
                      <input name="to" value={editForm.to} onChange={handleEditChange} required className="flex-1 px-2 py-1 rounded border" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <input name="date" value={editForm.date} onChange={handleEditChange} required type="date" className="px-2 py-1 rounded border" />
                      <input name="passengers" value={editForm.passengers} onChange={handleEditChange} required type="number" min="1" max="9" className="w-20 px-2 py-1 rounded border" />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button type="submit" className="bg-[var(--primary-color)] text-white px-3 py-1 rounded font-semibold">Save</button>
                      <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-700 px-3 py-1 rounded font-semibold">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🛫</span>
                      <span className="font-bold text-lg text-[var(--primary-color)]">{b.from}</span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="font-bold text-lg text-[var(--primary-color)]">{b.to}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[var(--muted-text)]">
                      <span className="text-sm">📅 {b.date}</span>
                      <span className="text-sm">👤 {b.passengers} passenger{b.passengers > 1 ? 's' : ''}</span>
                    </div>
                    <div className="absolute top-2 right-4 text-xs bg-[var(--accent-color)] text-white px-3 py-1 rounded-full shadow">Booked</div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => startEdit(b)} className="bg-[var(--primary-color)] text-white px-3 py-1 rounded font-semibold text-sm">Edit</button>
                      <button onClick={() => handleDelete(b._id)} className="bg-red-500 text-white px-3 py-1 rounded font-semibold text-sm">Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
