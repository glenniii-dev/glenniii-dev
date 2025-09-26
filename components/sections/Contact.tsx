"use client";

export default function Contact() {
  function sendEmail(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    const mailtoLink = `mailto:glenniii.dev@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    window.open(mailtoLink, "_blank");
  }

  return (
    <section className="lg:col-span-3 bg-(--blue) rounded-3xl p-8 shadow-md transition-transform duration-300 hover:-translate-y-1">
        <h2 className="text-2xl font-semibold border-b-2 border-(--light-blue) pb-2 mb-6">Contact</h2>
        <div>
        <form className="flex flex-col lg:flex-row gap-6 contact-form text-white" onSubmit={sendEmail}>
          <div className="flex-1 contact-inputs flex flex-col gap-4 lg:max-w-sm">
            <input type="text" name="name" placeholder="Your Name" className="border border-(--light-blue) rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-(--light-blue)" required />
            <input type="email" name="email" placeholder="Your Email" className="border border-(--light-blue) rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-(--light-blue)" required />
            <input type="text" name="subject" placeholder="Your Subject" className="border border-(--light-blue) rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-(--light-blue)" required />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <textarea name="message" placeholder="Your Message" className="h-29 border border-(--light-blue) rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-(--light-blue)" required></textarea>
            <button type="submit" className="bg-(--light-blue) text-white px-6 py-3 rounded-2xl hover:font-bold transition-colors duration-300 w-full lg:w-auto">Send</button>
          </div>
        </form>
        </div>
    </section>
  )
}