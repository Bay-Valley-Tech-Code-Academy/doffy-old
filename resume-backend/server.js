import express from 'express';
import puppeteer from 'puppeteer';
import * as theme from 'jsonresume-theme-stackoverflow';
import { render } from 'resumed';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'], 
}));
app.use(express.json());

app.post('/generate-resume', async (req, res) => {
    try {

        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        const resumeData = req.body;
        const html = await render(resumeData, theme);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            path: 'resume.pdf',
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
        });

        await browser.close();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating resume PDF:', error);
        res.status(500).send('Error generating resume PDF');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
