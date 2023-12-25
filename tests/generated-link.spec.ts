import { expect, test } from "@playwright/test";

test("should display the link in the input and copy button", async ({
  page,
}) => {
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
  await expect(page).toHaveURL(/\/generate-link\/[a-zA-Z0-9]+/gi);
  const linkInput = await page.getByTestId(/generate-link-input/gi);
  const copyButton = await page.getByRole("button", {
    name: /copy link/gi,
  });
  await expect(linkInput).toBeVisible();
  await expect(copyButton).toBeVisible();
});

test("should copy the link to the clipboard", async ({ page }) => {
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
  const copySuccessMessage = await page.locator(".v-toast__text", {
    hasText: /Copied to clipboard!/i,
  });
  await copyButton.click();
  await expect(await copySuccessMessage).toBeVisible();
  await expect(await linkInput.inputValue()).toMatch(
    /^https?:\/\/[^\/]+\/[^\/]+$/gi
  );
});
