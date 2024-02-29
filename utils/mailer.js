const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ejike.developer@gmail.com",
    pass: "dlfeceyafltwuepr",
  },
});

const newUserMailer = async (email, firstName) => {
  const mailOptions = {
    from: "mbtronics",
    to: email,
    subject: "Welcome to The Book Shop - Your Authentic Knowledge Plug!",
    text: `Dear ${firstName},

    Welcome to the Book Shop! Thank you for choosing us, and we're thrilled to have you join us to simplify your reading experience.
    
    Warm regards,
    THE BOOK SHOP 
    `,
    html: `<body>
    <p>Dear ${firstName},</p>
    <p>
    Welcome to the Book Shop! Thank you for choosing us, and we're thrilled to have you join us to simplify your reading experience.
    </p>
  
    <p>Warm regards,</p>
    <strong>THE BOOK SHOP</strong>
 
</body>
`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};

module.exports = {
  newUserMailer,
};
