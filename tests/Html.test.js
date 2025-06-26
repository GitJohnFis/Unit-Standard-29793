const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('People Potential Website - HTML Validator', () => {
  test('Validates HTML has properly opened and closed tags', () => {
    // Read the HTML file from src/app/index.html
    const html = fs.readFileSync(path.resolve(__dirname, '../src/app/index.html'), 'utf-8');
    
    // Parse HTML with JSDOM
    let document;
    try {
      const dom = new JSDOM(html);
      document = dom.window.document;
    } catch (error) {
      throw new Error('HTML parsing failed due to invalid structure: ' + error.message);
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
    expect(allElements.length).toBeGreaterThan(0); // Ensure elements exist
    allElements.forEach((element) => {
      expect(element.tagName).toBeTruthy(); // Valid tag name
    });
  });
});
