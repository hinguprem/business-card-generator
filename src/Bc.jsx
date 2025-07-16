import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

function Bc() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    companyName: '',
    title: '',
    website: '',
  });

  const cardRef = useRef(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const exportAsImage = () => {
    html2canvas(cardRef.current, { scale: 2, backgroundColor: '#ffffff' }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'business_card.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const exportAsPDF = () => {
    html2canvas(cardRef.current, { scale: 2, backgroundColor: '#ffffff' }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'px', [canvas.width, canvas.height]);
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('business_card.pdf');
    });
  };

  return (
    <div className="main-container">
      <h2>Business Card Generator</h2>

      <div className="layout">
        {/* Left - Form */}
        <div className="form-section">
          <input name="firstName" onChange={handleChange} placeholder="First name" />
          <input name="lastName" onChange={handleChange} placeholder="Last name" />
          <input name="email" onChange={handleChange} placeholder="Email" />
          <input name="contactNumber" onChange={handleChange} placeholder="Contact Number" />
          <input name="companyName" onChange={handleChange} placeholder="Company Name" />
          <input name="title" onChange={handleChange} placeholder="Title" />
          <input name="website" onChange={handleChange} placeholder="Website" />

          <div className="btn-group">
            <button className="blue" onClick={exportAsImage}>Download as Image</button>
            <button className="red" onClick={exportAsPDF}>Download as PDF</button>
          </div>
        </div>

        {/* Right - Card Preview */}
        <div className="card-container">
          <div className="card-wrapper" ref={cardRef}>
            <div className="card front">
              <div className="blue"></div>
              <div className="yellow"></div>
              <div className="pink"></div>
              <div className="dots"></div>
              <div className="personal-intro">
                <p>{data.firstName} {data.lastName}</p>
                <p>{data.title}</p>
              </div>
            </div>

            <div className="card back">
              <div className="yellow"></div>
              <div className="top dots"></div>
              <div className="personal-info">
                <p>{data.firstName} {data.lastName}</p>
                <p>{data.title}</p>
                <p>{data.companyName}</p>
                <p>{data.email}</p>
                <p>{data.contactNumber}</p>
                <p>{data.website}</p>
              </div>
              <div className="bottom dots"></div>
              <div className="pink"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bc;
