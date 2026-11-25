import { useState } from 'react';
import { Field } from '../../components/ui/Field';
import { PageHero } from '../../components/ui/PageHero';
import { Reveal } from '../../components/ui/Reveal';
import { useForm } from '../../hooks/useForm';
import { IMAGES } from '../../data/images';
import { CONTACT_ITEMS, SITE, SOCIAL_LINKS } from '../../data/site';
import { normalizePhone, validateContact, type ContactValues } from '../../utils/validation';
import './ContactPage.css';

const INITIAL_VALUES: ContactValues = { name: '', phone: '', email: '', message: '' };

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);
  const { values, errors, setValue, handleChange, handleSubmit } = useForm(INITIAL_VALUES, validateContact);

  // TODO: изпращане на съобщението към сървър / email услуга
  const onValid = () => setIsSent(true);

  return (
    <main className="page">
      <PageHero title="Контакти" image={IMAGES.contactHero} height="38vh" mobileHeight="30vh" />

      <div className="contact">
        <Reveal direction="left" delay={100}>
          <div className="contact__map">
            <iframe src={SITE.mapEmbedUrl} title="Карта – Auto Salon BG" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </Reveal>

        <Reveal direction="right" delay={250}>
          <div className="contact__info">
            <h2>Намерете ни</h2>
            {CONTACT_ITEMS.map((item) => (
              <div className="contact__row" key={item.label}>
                <i className={`fas ${item.icon}`} aria-hidden="true" />
                <div>
                  <strong>{item.label}</strong>
                  <br />
                  {item.href ? <a href={item.href}>{item.value}</a> : item.value}
                </div>
              </div>
            ))}
            <div className="contact__socials">
              {SOCIAL_LINKS.map((social) => (
                <a key={social.label} href={social.href} className="contact__social" aria-label={social.label}>
                  <i className={`fab ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <section className="contact-form">
          <h2>Изпратете съобщение</h2>

          {isSent ? (
            <p className="contact-form__sent">✓ Изпратено! Ще се свържем с вас скоро.</p>
          ) : (
            <form onSubmit={handleSubmit(onValid)} noValidate>
              <div className="form-grid">
                <Field id="name" label="Име и фамилия" required error={errors.name}>
                  <input id="name" name="name" value={values.name} onChange={handleChange} placeholder="Иван Иванов" autoComplete="name" />
                </Field>
                <Field id="contact-phone" label="Телефон">
                  <input id="contact-phone" name="phone" type="tel" value={values.phone} onChange={(e) => setValue('phone', normalizePhone(e.target.value))} placeholder="+359 88..." autoComplete="tel" />
                </Field>
              </div>

              <Field id="contact-email" label="Email" required error={errors.email}>
                <input id="contact-email" name="email" type="email" value={values.email} onChange={handleChange} placeholder="email@example.com" autoComplete="email" />
              </Field>

              <Field id="message" label="Съобщение">
                <textarea id="message" name="message" rows={4} value={values.message} onChange={handleChange} placeholder="Вашето съобщение..." />
              </Field>

              <button type="submit" className="btn-submit">
                Изпрати
              </button>
            </form>
          )}
        </section>
      </Reveal>
    </main>
  );
}
