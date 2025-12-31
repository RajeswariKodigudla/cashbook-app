import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/faq.css";
import { faqData } from "../data/faqData";

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-page">

      {/* HEADER */}
      <div className="faq-header">
        <span onClick={() => navigate(-1)}>‹</span>
        <h2>FAQ</h2>
      </div>

      {/* FAQ LIST */}
      {faqData.map((item, i) => (
        <div key={i} className="faq-item">
          <div className="faq-question" onClick={() => toggle(i)}>
            <p>{item.q}</p>
            <span className={openIndex === i ? "rotate" : ""}>⌄</span>
          </div>

          {openIndex === i && (
            <div className="faq-answer">
              {item.a}
            </div>
          )}
        </div>
      ))}

    </div>
  );
}
