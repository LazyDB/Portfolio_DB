import { useState } from "react";
import emailjs from "@emailjs/browser";

const initialForm = {
  from_name: "",
  from_email: "",
  phone: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.from_name || !form.from_email || !form.message) {
      setStatus("Please fill in your name, email and message.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus("Message sent successfully. I will get back to you soon.");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page contact-page">
      <section className="section-heading">
        <p className="eyebrow">Contact Me</p>
        <h1>Let’s build something together.</h1>
        <p>
          Have a project, job opportunity, or collaboration in mind? Send me a
          message directly from here.
        </p>
      </section>

      <section className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="from_name">Name</label>
            <input
              id="from_name"
              type="text"
              name="from_name"
              value={form.from_name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="from_email">Email</label>
            <input
              id="from_email"
              type="email"
              name="from_email"
              value={form.from_email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="6"
            />
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && <p className="form-status">{status}</p>}
        </form>
      </section>
    </main>
  );
}