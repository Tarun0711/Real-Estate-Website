import { useState } from "react";

function ContactForm({ isModal }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "Buy",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
      {isModal && (
        <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => console.log('Close modal')}>
          &times;
        </button>
      )}
      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-3 border rounded" required />
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded" required />
      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded" required />
      <select name="interest" value={formData.interest} onChange={handleChange} className="w-full p-3 border rounded">
        <option value="Buy">Buy</option>
        <option value="Sell">Sell</option>
        <option value="Rent">Rent</option>
      </select>
      <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="w-full p-3 border rounded h-24" required></textarea>
      <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-gray-800">Send Message</button>
    </form>
  );
}

export default ContactForm;
