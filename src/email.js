const PUBLIC_ID = import.meta.env.VITE_PUBLIC_ID;
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;

emailjs.init(PUBLIC_ID);

window.sendEmail = function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    alert('Please fill out all fields.');
    return;
  }

  emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    name: name,
    email: email,
    message: message
  }).then(() => {
    alert('Message sent successfully!');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  }, (error) => {
    alert('Failed to send message. Please try again.');
    console.error('EmailJS error:', error);
  });
};

console.log("PUBLIC_ID:", import.meta.env.VITE_PUBLIC_ID);

window.sendEmail = sendEmail;