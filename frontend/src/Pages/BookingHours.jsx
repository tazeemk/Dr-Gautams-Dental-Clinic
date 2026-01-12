import React, { useEffect, useState } from 'react';
import MorningData from './PagesData/MorningData';
import EveningData from './PagesData/EveningData';
import Logo from '../assets/logo.png';
import './BookingHours.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';

const BookingHours = () => {
  const SLOT_API = 'http://localhost:9090/bookingSlot/slots';
  const BOOK_API = 'http://localhost:9090/appointment/addAppointment';

  const navigate = useNavigate();

  const [bookedSlots, setBookedSlots] = useState([]);
  const [loader, setLoader] = useState('none');
  const [btn, setBtn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [activeUser, setActiveUser] = useState({
    appointmentDate: '',
    description: '',
    time: '',
  });

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const user = localStorage.getItem('userData');
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  /* ================= FETCH SLOTS (DATE BASED) ================= */
  useEffect(() => {
    if (!activeUser.appointmentDate) return;

    setBookedSlots([]); // clear old date data

    fetch(`${SLOT_API}?date=${activeUser.appointmentDate}`)
      .then((res) => res.json())
      .then((data) => {
        /**
         * ONLY mark slots which are actually booked/disabled
         */
        const bookedTimes = data
          .filter(
            (slot) =>
              slot.booked === true || slot.disabled === true
          )
          .map((slot) => slot.time);

        setBookedSlots(bookedTimes);
      })
      .catch(() => toast.error('Failed to load slots'));
  }, [activeUser.appointmentDate]);

  /* ================= DATE LIMIT ================= */
  const todayStr = new Date().toISOString().split('T')[0];

  /* ================= PAST SLOT CHECK (TODAY ONLY) ================= */
  const isPastSlot = (slotTime) => {
    if (!activeUser.appointmentDate) return false;

    const today = new Date();
    const selectedDate = new Date(activeUser.appointmentDate);

    if (today.toDateString() !== selectedDate.toDateString()) {
      return false;
    }

    const [time, period] = slotTime.split(' ');
    let [h, m] = time.split(':').map(Number);

    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;

    const slotDate = new Date();
    slotDate.setHours(h, m, 0, 0);

    return slotDate < today;
  };

  /* ================= SLOT RENDER ================= */
  const renderSlot = (time, type) => {
    const isBooked = bookedSlots.includes(time);
    const isPast = isPastSlot(time);

    const disabled = isBooked || isPast;

    const className = `
      ${type === 'M' ? 'md_data' : 'ed_data'}
      ${disabled ? 'disabled' : ''}
      ${activeUser.time === time ? 'selected' : ''}
    `;

    return (
      <div
        key={time}
        className={className}
        onClick={() => {
          if (!disabled) {
            setActiveUser({ ...activeUser, time });
          }
        }}
      >
        {time}
        {isBooked && <span className="booked-text">Booked</span>}
      </div>
    );
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activeUser.appointmentDate || !activeUser.time) {
      toast.error('Select date & slot');
      return;
    }

    setBtn(true);
    setLoader('flex');

    try {
      const res = await fetch(
        `${BOOK_API}/${currentUser.userId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(activeUser),
        }
      );

      if (res.status === 200) {
        toast.success('Appointment booked');
        setTimeout(() => navigate('/'), 3000);
      } else {
        toast.error('Booking failed');
      }
    } catch {
      toast.error('Server error');
    } finally {
      setBtn(false);
      setLoader('none');
    }
  };

  return (
    <div className="booking_section_container">
      <div className="bsc_lower">
        <form onSubmit={handleSubmit}>
          <div className="bsc_lower_container">
            <div className="form_for_booking">
              <img src={Logo} alt="logo" />
              <h2>Dr. Gautam's Dental Clinic</h2>

              <label>Choose Date</label>
              <input
                type="date"
                min={todayStr}
                value={activeUser.appointmentDate}
                onChange={(e) =>
                  setActiveUser({
                    appointmentDate: e.target.value,
                    description: activeUser.description,
                    time: '',
                  })
                }
              />

              <label>Description</label>
              <textarea
                value={activeUser.description}
                onChange={(e) =>
                  setActiveUser({
                    ...activeUser,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="me_slot_selection">
              <span>Morning Slots</span>
              <div className="morning_info_container">
                {MorningData.map((s) =>
                  renderSlot(s.m_slot_time, 'M')
                )}
              </div>

              <hr />

              <span>Evening Slots</span>
              <div className="evening_info_container">
                {EveningData.map((s) =>
                  renderSlot(s.e_slot_time, 'E')
                )}
              </div>

              <button
                className="booking_c_btn"
                type="submit"
                disabled={btn}
              >
                {!btn && 'Submit'}
                <Spinner style={loader} />
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default BookingHours;
