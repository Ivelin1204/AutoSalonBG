import { useNavigate } from 'react-router-dom';

export interface BookingLocationState {
  service?: string;
}

/** Отваря страницата за записване, по желание с предварително избрана услуга. */
export function useBooking() {
  const navigate = useNavigate();
  return (service?: string) => {
    const state: BookingLocationState = { service };
    navigate('/booking', { state });
  };
}
