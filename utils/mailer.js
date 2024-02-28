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
    subject: "Welcome to MBtronics - Your Auto Repair Partner!",
    text: `Dear ${firstName},

    Welcome to MBtronics! We're thrilled to have you join us to simplify your auto repair experience.
    
    Here's a quick guide to get started:
    
    1. Easy Booking: Schedule repairs effortlessly.
    2. Real-time Updates: Stay informed about your vehicle.
    3. Support: We're here to help.
    4. Exclusive Savings: Look out for offers.
    
    Your feedback matters. Share your thoughts anytime.
    
    Thanks for choosing MBtronics. Let's keep your vehicle running smoothly!
    
    Warm regards,
    MBTRONICS 
    `,
    html: `<body>
    <p>Dear ${firstName},</p>
    <p>Welcome to MBtronics! We're thrilled to have you join us to simplify your auto repair experience.</p>
    
    <p>Here's a quick guide to get started:</p>
    <ol>
        <li><strong>Easy Booking:</strong> Schedule repairs effortlessly.</li>
        <li><strong>Real-time Updates:</strong> Stay informed about your vehicle.</li>
        <li><strong>Support:</strong> We're here to help.</li>
        <li><strong>Exclusive Savings:</strong> Look out for offers.</li>
    </ol>
    
    <p>Your feedback matters. Share your thoughts anytime.</p>
    
    <p>Thanks for choosing MBtronics. Let's keep your vehicle running smoothly!</p>
    
    <p>Warm regards,</p>
    <strong>MBTRONICS</strong>
 
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

const newOrderMailer = async (id) => {
  const mailOptions = {
    from: "ejike.developer@gmail.com",
    to: "ejike.developer@gmail.com",
    subject: " New Order Alert",
    text: `Hello,

    A new order has been placed on our app. Here are the details:
    
    - Order Number: ${id}
    
    To manage the order, log in to the admin dashboard.    
    If you have any questions, reach out to support...
    
    Best regards,
    mbtronics
    `,
    html: `<body>
    <p>Hello,</p>
    <p>A new order has been placed on our app. Here are the details:</p>

    <li>Order Number: <strong>${id}</strong></li>

    <p>To manage the order, log in to the admin dashboard.</p>

    <p>If you have any questions, reach out to support..</p>

    <p>Best regards,</p>
<strong>mbtronics</strong>
  
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

const confirmedOrderMailer = async (
  email,
  firstName,
  product,
  date,
  time,
  price
) => {
  const mailOptions = {
    from: "ejike.developer@gmail.com",
    to: email,
    subject: "Confirmation: Your New MBtronics Order is Underway! 🚀",
    text: `Dear ${firstName},

    We're thrilled to let you know that your recent MBtronics order has been successfully placed:
    
    - Service: ${product}
    - Date: ${date}
    - Time:${time}
    - price: ${price}
    
    Our team is already hard at work, ensuring your order is carefully prepared and readied for shipping.
    Keep an eye out for updates on your order's status.
    
    Have any questions? Feel free to reach out at any time.
        
    Thank you for choosing MBtronics!
    
    Warm regards,
    
    mbtronics
    `,
    html: `
    <body>
        <p>Dear <strong>${firstName}</strong>,</p>
        
        <p>We're thrilled to let you know that your recent MBtronics order has been successfully placed:</p>
        
        <ul>
            <li>Service: <strong>${product}</strong></li>
            <li>Date: <strong>${date}</strong></li>
            <li>Time: <strong>${time}</strong></li>
            <li>Price: <strong>${price}</strong></li>
        </ul>
        
        <p>Our team is already hard at work, ensuring your order is carefully prepared and readied for shipping.</p>
        <p>Keep an eye out for updates on your order's status.</p>
        
        <p>Have any questions? Feel free to reach out at any time.</p>
                
        <p>Thank you for choosing MBtronics!</p>
        
        <p>Warm regards,</p>
        <strong>mbtronics</strong>
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

const declinedOrderMailer = async (
  email,
  firstName,
  product,
  date,
  time,
  price
) => {
  const mailOptions = {
    from: "ejike.developer@gmail.com",
    to: email,
    subject: "Update on Your Recent Order with MBtronics",
    text: `Dear ${firstName},

    We regret to inform you that your recent order with MBtronics has been declined:
    
    - Service: ${product}
    - Date: ${date}
    - Time:${time}
    - price: ${price}
    
    Unfortunately, we were unable to process your order as requested. We apologize for any inconvenience this may have caused.
    
    If you have any questions or concerns regarding this decline or wish to explore alternative options, please do not hesitate to contact us at your earliest convenience. We are here to assist you.
    
    Thank you for considering MBtronics. We value your interest in our services.
    
    Warm regards,
    
    MBtronics
  `,
    html: `<body>
       <p>Dear ${firstName},</p>

    <p>We regret to inform you that your recent order with MBtronics has been declined:</p>

       
    <ul>
    <li>Service: <strong>${product}</strong></li>
    <li>Date: <strong>${date}</strong></li>
    <li>Time: <strong>${time}</strong></li>
    <li>Price: <strong>${price}</strong></li>
</ul>

    <p>Unfortunately, we were unable to process your order as requested. We apologize for any inconvenience this may have caused.</p>

    <p>If you have any questions or concerns regarding this decline or wish to explore alternative options, please do not hesitate to contact us at your earliest convenience. We are here to assist you.</p>

    <p>Thank you for considering MBtronics. We value your interest in our services.</p>

    <p>Warm regards,</p>
        <strong>mbtronics</strong>
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

const resetPasswordRequestMailer = async (email, firstName, link) => {
  const mailOptions = {
    from: "mbtronics",
    to: email,
    subject: "Reset Password",
    html: `<body>
    <p>Hi ${firstName}</p>
    <p>You requested to reset your password.</p>
    <p>Please, click the link below to reset your password</p>
    <a href=${link}>Reset Password</a>
    </body>`,
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
  newOrderMailer,
  confirmedOrderMailer,
  declinedOrderMailer,
  resetPasswordRequestMailer,
};
