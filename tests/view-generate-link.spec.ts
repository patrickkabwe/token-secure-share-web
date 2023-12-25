import { expect, test } from "@playwright/test";

test("should display the content of the link", async ({ page }) => {
  await page.goto("/");
  const form = await page.getByTestId("generate-link-form");
  const input = await form.getByRole("textbox", {
    name: /enter your secret here.../gi,
  });
  const button = await form.getByRole("button", {
    name: /generate link/gi,
  });

  await input.fill("my secret");
  await button.click();
  const linkInput = await page.getByTestId(/generate-link-input/gi);
  const copyButton = await page.getByRole("button", {
    name: /copy link/i,
  });
  await copyButton.click();
  await page.goto(await linkInput.inputValue());
  const content = await page.getByRole("textbox", {
    name: /secret/gi,
  });
  await expect(content).toBeVisible();
  await expect(await content.inputValue()).toMatch(/my secret/gi);
});

test("should copy the content to the clipboard", async ({ page }) => {
  await page.goto("/");
  const form = await page.getByTestId("generate-link-form");
  const input = await form.getByRole("textbox", {
    name: /enter your secret here.../gi,
  });
  const button = await form.getByRole("button", {
    name: /generate link/gi,
  });

  await input.fill("my secret");
  await button.click();
  const linkInput = await page.getByTestId(/generate-link-input/gi);
  const copyButton = await page.getByRole("button", {
    name: /copy link/i,
  });
  await copyButton.click();
  await page.goto(await linkInput.inputValue());

  const copyContentButton = await page.getByRole("button", {
    name: /copy content/i,
  });
  const copyContentSuccessMessage = await page.locator(".v-toast__text", {
    hasText: /Copied to clipboard!/i,
  });
  await copyContentButton.click();
  await expect(await copyContentSuccessMessage).toBeVisible();
});
