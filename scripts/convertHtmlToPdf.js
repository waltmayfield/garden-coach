#!/usr/bin/env node

/**
 * Convert HTML to PDF using Puppeteer
 * This creates a test document with charts and diagrams for RAG testing
 */

const fs = require('fs');
const path = require('path');

async function convertToPdf() {
  try {
    // Try to import puppeteer
    const puppeteer = await import('puppeteer').catch(() => null);
    
    if (!puppeteer) {
      console.log('❌ Puppeteer not installed');
      console.log('');
      console.log('Please install puppeteer:');
      console.log('  npm install -g puppeteer');
      console.log('');
      console.log('Or manually convert the HTML:');
      console.log('  1. Open test_documents/industrial_operations_manual.html in your browser');
      console.log('  2. Print to PDF (Cmd+P / Ctrl+P)');
      console.log('  3. Save as test_documents/industrial_operations_manual.pdf');
      process.exit(1);
    }

    const htmlPath = path.join(process.cwd(), 'test_documents', 'industrial_operations_manual.html');
    const pdfPath = path.join(process.cwd(), 'test_documents', 'industrial_operations_manual.pdf');

    if (!fs.existsSync(htmlPath)) {
      console.error('❌ HTML file not found:', htmlPath);
      process.exit(1);
    }

    console.log('🔄 Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new'
    });

    const page = await browser.newPage();
    
    console.log('📄 Loading HTML...');
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0'
    });

    console.log('🖨️  Generating PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });

    await browser.close();

    console.log('✅ PDF created:', pdfPath);
    console.log('');
    console.log('Next steps:');
    console.log('  1. Run: bash scripts/uploadTestDocument.sh');
    console.log('  2. Wait for ingestion to complete');
    console.log('  3. Test RAG queries in the chat interface');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('');
    console.log('Manual conversion:');
    console.log('  1. Open test_documents/industrial_operations_manual.html in your browser');
    console.log('  2. Print to PDF (Cmd+P / Ctrl+P)');
    console.log('  3. Save as test_documents/industrial_operations_manual.pdf');
    process.exit(1);
  }
}

convertToPdf();
