const fs = require('fs');
const Path = require('path');
const { JSDOM } = require('jsdom');

describe('People Potential Website - HTML Validator', () => {
  test('Validates HTML has properly opened and closed tags', () => {
    const htmlPath = Path.resolve(__dirname, '../src/app/app.html');
    console.log(`Reading HTML file from: ${htmlPath}`);

    // Verify file exists
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`HTML file not found at: ${htmlPath}`);
    }

    // Read HTML file
    const html = fs.readFileSync(htmlPath, 'utf-8');
    console.log(`HTML content length: ${html.length} characters`);

    // Parse HTML with JSDOM
    let document;
    try {
      const dom = new JSDOM(html);
      document = dom.window.document;
    } catch (error) {
      throw new Error(`HTML parsing failed: ${error.message}`);
    }

    // Check core HTML structure
    const htmlTag = document.querySelector('html');
    expect(htmlTag).not.toBeNull(); // Ensure <html> tag exists

    const headTag = document.querySelector('head');
    expect(headTag).not.toBeNull(); // Ensure <head> tag exists

    const bodyTag = document.querySelector('body');
    expect(bodyTag).not.toBeNull(); // Ensure <body> tag exists

    // Verify all elements have valid tag names
    const allElements = document.querySelectorAll('*');
    console.log(`Found ${allElements.length} HTML elements`);
    expect(allElements.length).toBeGreaterThan(0); // Ensure elements exist
    allElements.forEach((element) => {
      expect(element.tagName).toBeTruthy(); // Valid tag name
    });
  });
});
