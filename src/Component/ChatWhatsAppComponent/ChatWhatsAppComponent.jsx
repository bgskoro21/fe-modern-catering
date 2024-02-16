import React from "react";
import "./ChatWhatsApp.css";
import { Link } from "react-router-dom";
import { WhatsAppButton } from "../../assets";

const ChatWhatsAppComponent = () => {
  return (
    <Link aria-label="Chat on WhatsApp" to="https://wa.me/+6285369299969" target="_blank" className="chat-whatsapp">
      <img alt="Chat on WhatsApp" src={WhatsAppButton} className="img-fluid" width={200} />
    </Link>
  );
};

export default ChatWhatsAppComponent;
