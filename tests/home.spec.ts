import { expect, test } from "@playwright/test";

test("should display the home page with 'token secure share' text", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", {
      name: /token secure share/gi,
    })
  ).toBeVisible();
});

test("should display the form with one input and button ", async ({ page }) => {
  await page.goto("/");
  const form = await page.getByTestId("generate-link-form");
  const input = await form.getByRole("textbox", {
    name: /enter your secret here.../gi,
  });
  const button = await form.getByRole("button", {
    name: /generate link/gi,
  });
  await expect(form).toBeVisible();
  await expect(input).toBeVisible();
  await expect(button).toBeVisible();
});

test("should submit the form and display the link", async ({ page }) => {
  await page.goto("/");
  const form = await page.getByTestId("generate-link-form");
  const input = await form.getByRole("textbox", {
    name: /enter your secret here.../gi,
  });
  const button = await form.getByRole("button", {
    name: /generate link/gi,
  });
  const successMessage = await page.locator(".v-toast__text");
  await input.fill("my secret");
  await button.click();
  await expect(successMessage).toBeVisible();
  await expect(page).toHaveURL(/\/generate-link\/[a-zA-Z0-9]+/gi);
});

test('should be on the home page after clicking the "token secure share" link', async ({
  page,
}) => {
  await page.goto("/");
  const logoText = page.getByRole("link", {
    name: /token secure share/gi,
  });
  await logoText.click();
  await expect(page).toHaveURL(/\/$/gi);
});
