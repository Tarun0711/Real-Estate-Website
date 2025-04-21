const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Property Wallah - Email Notification</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
    
    <style>
      @media only screen and (max-width: 600px) {
        .container {
          padding: 20px;
        }
        .content {
          padding: 20px;
        }
        .main-header {
          font-size: 22px;
        }
        .otp {
          font-size: 24px;
          letter-spacing: 10px;
        }
      }
    </style>
  </head>
  <body style="margin: 0; font-family: 'Poppins', sans-serif; background-color: #f4f7ff; font-size: 14px;">
    <div class="container" style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <header>
        <table style="width: 100%;">
          <tr>
            <td style="text-align: center;">
              <img src="https://www.figma.com/design/uw3UMgszuufFpOVNRL7oVg/Untitled?node-id=33-22&t=cZz0xH91NYsL5jFR-4" alt="Property Wallah" height="120px" />
            </td>
          </tr>
        </table>
      </header>
    
      <main class="content" style="text-align: center; padding: 20px;">
        <h1 class="main-header" style="font-size: 28px; font-weight: 600; color: #2b2b2b; margin-bottom: 20px;">Property Wallah</h1>
        
        <p style="font-size: 16px; font-weight: 500; color: #555555; margin-top: 20px;">
          Thank you for choosing Property Wallah! Use the OTP below to complete the procedure of changing your email address.
        </p>
        
        <p style="font-size: 18px; font-weight: 500; margin-top: 10px;">
          The OTP is valid for <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>. Please do not share it with anyone, including Property Wallah employees.
        </p>
        
        <p class="otp" style="font-size: 32px; font-weight: 700; letter-spacing: 20px; color: #ba3d4f; margin-top: 40px;">
          ${otp}
        </p>
        
        <p style="margin-top: 60px; color: #8c8c8c; font-weight: 500;">
          Need help? Reach us at <a href="mailto:help@bahadurdangi100@gmail.com" style="color: #499fb6; text-decoration: none;">bahadurdangi100@gmail.com</a> or visit our <a href="#" style="color: #499fb6; text-decoration: none;">Help Center</a>.
        </p>
      </main>
    
      <footer style="text-align: center; margin-top: 40px; border-top: 1px solid #e6ebf1; padding-top: 20px;">
        <p style="font-size: 16px; font-weight: 600; color: #434343;">PROPERTY WALLAH</p>
        <p style="font-size: 14px; color: #434343;">Faridabad, Haryana, INDIA</p>
        
        <div style="margin-top: 16px;">
          <a href="#" style="display: inline-block; margin: 0 8px;"><img width="36px" alt="Facebook" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook" /></a>
          <a href="#" style="display: inline-block; margin: 0 8px;"><img width="36px" alt="Instagram" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" /></a>
          <a href="#" style="display: inline-block; margin: 0 8px;"><img width="36px" alt="Twitter" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" /></a>
          <a href="#" style="display: inline-block; margin: 0 8px;"><img width="36px" alt="Youtube" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube" /></a>
        </div>

        <p style="margin-top: 16px; color: #434343; font-size: 12px;">Copyright © 2025 Property Wallah. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>

	`;
};
module.exports = otpTemplate;