import { expect, test } from "@playwright/test";

test("should display error message when page refreshes", async ({ page }) => {
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
  await page.goto(await linkInput.inputValue());
  const content = await page.getByRole("textbox", {
    name: /secret/gi,
  });
  await expect(content).toBeVisible();
  await expect(await content.inputValue()).toBe("my secret");
  await page.reload();
  const errorMessage = await page.getByTestId("error-heading");
  await expect(errorMessage).toBeVisible();
});

test("should take the user to home page after clicking back", async ({
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
  const linkInput = await page.getByTestId(/generate-link-input/gi);
  await page.goto(await linkInput.inputValue());
  await page.reload();
  const backButton = await page.getByRole("button", {
    name: /back home/gi,
  });
  await backButton.click();
  await expect(page).toHaveURL(/\/$/gi);
});
