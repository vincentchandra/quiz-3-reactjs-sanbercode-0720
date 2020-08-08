import React from 'react'

import './public/css/style.css'

function About() {
    return(
        <>
        <div className="about">
      <body>
        <div className="back" style={{padding: "10px", border: "1px solid #ccc"}}>
          <h1 style={{textAlign: "center"}}>Data Peserta Sanbercode Bootcamp Reactjs</h1>
          <ol>
            <li><strong style={{width: "100px"}}>Nama:</strong>Vincent Christian Chandra</li> 
            <li><strong  style={{width: "100px"}}>Email:</strong>vincentchristian6@gmail.com</li> 
            <li><strong  style={{width: "100px"}}>Sistem Operasi yang digunakan:</strong>Windows</li>
            <li><strong  style={{width: "100px"}}>Akun Gitlab:</strong>vincentchandra</li> 
            <li><strong  style={{width: "100px"}}>Akun Telegram:</strong>Vincent</li> 
          </ol>
        </div>
      </body>
      </div>
    
        </>
    )
}

export default About;