import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_omrvnis', 'template_petsqle', form.current, 'LwcYqrkLrSBfx8E62')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
        <div className="form-group"> 
            <label>Name     </label>
            <input type="text" name="from_name" />
        </div>
        <div className="form-group"> 
            <label>Email    </label>
            <input type="email" name="from_email" />
        </div>
        <div className="form-group"> 
            <label>Subject  </label>
            <input type="text" name="subject" />
        </div>
        <div className="form-group"> 
            <label>Message</label>
            <textarea name="message" />
        </div>
        <button type="submit" className="edit-profile-button">Send</ button>
    </form>
  );
};