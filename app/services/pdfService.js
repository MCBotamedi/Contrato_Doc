const puppeteer = require('puppeteer');

/**
 * Generates a PDF buffer from HTML content
 * @param {string} htmlContent - The HTML string to render
 * @returns {Promise<Buffer>} - The PDF file as a buffer
 */
async function generatePDF(htmlContent) {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ],
            timeout: 60000 // Increase timeout to 60s
        });
        const page = await browser.newPage();

        // Set content and wait for network idle to ensure styles/images load
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });

        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = { generatePDF };
