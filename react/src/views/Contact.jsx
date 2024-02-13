import Sidebar from "../components/Sidebar.jsx";

export default function Contact() {
  return (
    <>
      <Sidebar />
      <main className="content">
        <h1>Contact Us</h1>
        <p>We're here to assist you. Choose your preferred method of contact:</p>
        <div className="contact-options">
          <div className="contact-option">
            <i className="ri-phone-line ri-lg"></i>
            <p>Call Support</p>
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="contact-option">
            <i className="ri-mail-line ri-lg"></i>
            <p>Email Sales</p>
            <span>sales@example.com</span>
          </div>
          <div className="contact-option">
            <i className="ri-chat-1-line ri-lg"></i>
            <p>Live Chat</p>
            <span>Chat with a representative</span>
          </div>
        </div>
      </main>
    </>
  );
}
