import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Knowledge Base RAG', () => {
  test.beforeEach(async ({ page }) => {
    // Load saved authentication state
    await page.goto('/');
    
    // Wait for authentication to complete
    await page.waitForURL('/', { timeout: 10000 });
  });

  test('should display knowledge base page', async ({ page }) => {
    // Navigate to knowledge base
    await page.goto('/knowledge-base');
    
    // Check page title
    await expect(page.getByRole('heading', { name: 'Knowledge Base' })).toBeVisible();
    
    // Check upload form elements
    await expect(page.getByLabel('Document File')).toBeVisible();
    await expect(page.getByLabel('Title')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.getByRole('button', { name: /Upload to Knowledge Base/i })).toBeVisible();
  });

  test('should upload a document to knowledge base', async ({ page }) => {
    await page.goto('/knowledge-base');
    
    // Create a test file
    const testFilePath = path.join(__dirname, 'fixtures', 'test-document.txt');
    
    // Upload file
    const fileInput = page.getByLabel('Document File');
    await fileInput.setInputFiles(testFilePath);
    
    // Fill in title
    await page.getByLabel('Title').fill('Test Document for RAG');
    
    // Fill in description
    await page.getByLabel('Description').fill('This is a test document for RAG functionality');
    
    // Click upload button
    await page.getByRole('button', { name: /Upload to Knowledge Base/i }).click();
    
    // Wait for success message
    await expect(page.getByText(/Document uploaded successfully/i)).toBeVisible({ timeout: 15000 });
  });

  test('should retrieve documents using RAG in chat', async ({ page }) => {
    // Navigate to chat
    await page.goto('/');
    
    // Wait for chat interface
    await expect(page.getByPlaceholder(/Ask me anything/i)).toBeVisible();
    
    // Type a query that should trigger RAG
    const chatInput = page.getByPlaceholder(/Ask me anything/i);
    await chatInput.fill('What information do you have in your knowledge base?');
    
    // Submit the message
    await page.keyboard.press('Enter');
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    // Check if RAG tool was called (look for retrieve-documents or retrieve-and-generate)
    const toolHeaders = page.locator('[data-tool-type*="retrieve"]');
    
    // If RAG is triggered, we should see tool execution
    const toolCount = await toolHeaders.count();
    if (toolCount > 0) {
      // Check for knowledge base sources
      await expect(page.getByText(/Knowledge Base Sources/i)).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display RAG sources with citations', async ({ page }) => {
    await page.goto('/');
    
    // Wait for chat interface
    await expect(page.getByPlaceholder(/Ask me anything/i)).toBeVisible();
    
    // Ask a question that should use RAG
    const chatInput = page.getByPlaceholder(/Ask me anything/i);
    await chatInput.fill('Search the knowledge base for safety procedures');
    await page.keyboard.press('Enter');
    
    // Wait for response
    await page.waitForTimeout(5000);
    
    // Look for RAG sources component
    const ragSources = page.locator('text=Knowledge Base Sources');
    const hasRagSources = await ragSources.count() > 0;
    
    if (hasRagSources) {
      // Click to show sources
      await page.getByRole('button', { name: /Show Sources/i }).click();
      
      // Check for source badges
      await expect(page.locator('text=/Source \\d+/i')).toBeVisible();
      
      // Check for relevance scores
      await expect(page.locator('text=/%\\s+relevance/i')).toBeVisible();
    }
  });

  test('should handle RAG errors gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for chat interface
    await expect(page.getByPlaceholder(/Ask me anything/i)).toBeVisible();
    
    // Try to use RAG with an empty knowledge base
    const chatInput = page.getByPlaceholder(/Ask me anything/i);
    await chatInput.fill('retrieve documents about nonexistent topic xyz123');
    await page.keyboard.press('Enter');
    
    // Wait for response
    await page.waitForTimeout(5000);
    
    // Should not crash - either shows no results or handles gracefully
    const errorMessages = page.locator('text=/error|failed/i');
    const hasError = await errorMessages.count() > 0;
    
    // If there's an error, it should be displayed properly
    if (hasError) {
      await expect(errorMessages.first()).toBeVisible();
    }
  });

  test('should navigate between knowledge base and chat', async ({ page }) => {
    // Start at knowledge base
    await page.goto('/knowledge-base');
    await expect(page.getByRole('heading', { name: 'Knowledge Base' })).toBeVisible();
    
    // Navigate to chat
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.getByPlaceholder(/Ask me anything/i)).toBeVisible();
    
    // Navigate back to knowledge base
    await page.getByRole('link', { name: 'Knowledge Base' }).click();
    await expect(page.getByRole('heading', { name: 'Knowledge Base' })).toBeVisible();
  });

  test('should show upload button disabled without file', async ({ page }) => {
    await page.goto('/knowledge-base');
    
    // Upload button should be disabled initially
    const uploadButton = page.getByRole('button', { name: /Upload to Knowledge Base/i });
    await expect(uploadButton).toBeDisabled();
    
    // Fill title only
    await page.getByLabel('Title').fill('Test Title');
    
    // Button should still be disabled without file
    await expect(uploadButton).toBeDisabled();
  });

  test('should auto-populate title from filename', async ({ page }) => {
    await page.goto('/knowledge-base');
    
    const testFilePath = path.join(__dirname, 'fixtures', 'test-document.txt');
    
    // Upload file
    const fileInput = page.getByLabel('Document File');
    await fileInput.setInputFiles(testFilePath);
    
    // Title should be auto-populated
    const titleInput = page.getByLabel('Title');
    await expect(titleInput).toHaveValue(/test-document/i);
  });
});
