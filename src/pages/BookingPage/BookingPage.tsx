import { useState, type CSSProperties } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Field } from '../../components/ui/Field';
import { MultiSelect } from '../../components/ui/MultiSelect';
import type { BookingLocationState } from '../../hooks/useBooking';
import { useForm } from '../../hooks/useForm';
import { IMAGES } from '../../data/images';
import { SERVICES } from '../../data/services';
import { normalizePhone, normalizePlate, validateBooking, type BookingValues } from '../../utils/validation';
import './BookingPage.css';

const SERVICE_TITLES = SERVICES.map((service) => service.title);

/** key={location.key} — формата се зарежда наново при всяко отваряне (напр. с друга услуга от чата). */
export default function BookingPage() {
  const location = useLocation();
  const preselected = (location.state as BookingLocationState | null)?.service;
  return <BookingForm key={location.key} preselected={preselected} />;
}

function BookingForm({ preselected }: { preselected?: string }) {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);

  const initialValues: BookingValues = {
    firstName: '',
    lastName: '',
    plate: '',
    email: '',
    phone: '',
    services: preselected ? [preselected] : [],
  };
  const { values, errors, setValue, handleChange, handleSubmit } = useForm(initialValues, validateBooking);

  const pageStyle = { '--hero-image': `url('${IMAGES.bookingBg}')` } as CSSProperties;

  // TODO: изпращане на заявката към сървър / email услуга
  const onValid = () => setIsSent(true);

  return (
    <main className="page booking" style={pageStyle}>
      <div className="booking__card">
        {isSent ? (
          <div className="booking__success">
            <div className="booking__check" aria-hidden="true">✓</div>
            <h1>Успешно записване!</h1>
            <p>Ще се свържем с вас скоро за потвърждение.</p>
            <button type="button" className="btn-submit" onClick={() => navigate('/')}>
              Към началото
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onValid)} noValidate>
            <h1>Запиши час</h1>

            <div className="form-grid">
              <Field id="firstName" label="Име" required error={errors.firstName}>
                <input id="firstName" name="firstName" value={values.firstName} onChange={handleChange} placeholder="Иван" autoComplete="given-name" />
              </Field>
              <Field id="lastName" label="Фамилия">
                <input id="lastName" name="lastName" value={values.lastName} onChange={handleChange} placeholder="Иванов" autoComplete="family-name" />
              </Field>
            </div>

            <Field id="plate" label="Номер на автомобила">
              <input
                id="plate"
                name="plate"
                value={values.plate}
                onChange={(e) => setValue('plate', normalizePlate(e.target.value))}
                placeholder="СА 1234 АБ"
                className="input--uppercase"
              />
            </Field>

            <div className="form-grid">
              <Field id="email" label="Email" required error={errors.email}>
                <input id="email" name="email" type="email" value={values.email} onChange={handleChange} placeholder="email@example.com" autoComplete="email" />
              </Field>
              <Field id="phone" label="Телефон">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={(e) => setValue('phone', normalizePhone(e.target.value))}
                  placeholder="+359 88..."
                  autoComplete="tel"
                />
              </Field>
            </div>

            <Field id="services" label="Услуга" required error={errors.services}>
              <MultiSelect
                id="services"
                options={SERVICE_TITLES}
                selected={values.services}
                onChange={(selected) => setValue('services', selected)}
                placeholder="Избери услуга..."
              />
            </Field>

            <button type="submit" className="btn-submit">
              Изпрати заявка
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
