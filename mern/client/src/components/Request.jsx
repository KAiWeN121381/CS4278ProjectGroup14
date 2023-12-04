import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function Request (props) {
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    if (!sessionStorage.getItem("userID")) {
        navigate('/login')
    }

    e.preventDefault();

    emailjs.sendForm('service_omrvnis', 'template_9m7gvmr', form.current, 'LwcYqrkLrSBfx8E62')
      .then((result) => {
          console.log(result.text);
          window.alert("Request sent successfully!")
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
        <input type="hidden" name="to_name" defaultValue={props.to_name}/>
        <input type="hidden" name="from_name" defaultValue={props.from_name}/>
        <input type="hidden" name="to_email" defaultValue={props.to_email}/>
        <input type="hidden" name="reply_to" defaultValue={props.reply_to}/>
        <button type="submit" className="request-sublet-button">Request Sublet</button>
    </form>
  );
};