const nodemailer = require('nodemailer');

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends an email with the contract attached
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email body text
 * @param {Buffer} pdfBuffer - The PDF file content
 * @param {string} filename - Name of the attached file
 */
async function sendContractEmail(to, subject, text, pdfBuffer, filename = 'Contrato.pdf') {
    console.log(`[EmailService] Tentando enviar email para: ${to}`);
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER, // sender address
            to: to,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: filename,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        });

        console.log("[EmailService] Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("[EmailService] Error sending email:", error);
        throw error;
    }
}

module.exports = { sendContractEmail };
