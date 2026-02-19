import { spawn } from "node:child_process";
import process from "node:process";
import { chromium } from "playwright";

const BASE_URL = "http://127.0.0.1:4173";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Preview server did not become ready at ${url}`);
}

async function run() {
  const previewProcess = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4173"], {
    cwd: process.cwd(),
    stdio: "ignore"
  });

  try {
    await waitForServer(BASE_URL);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    await page.goto(`${BASE_URL}/`);
    await page.waitForTimeout(400);
    assert((await page.locator("h1").count()) > 0, "Home page hero heading missing");

    await page.goto(`${BASE_URL}/risk-check`);
    await page.waitForTimeout(300);
    await page
      .locator('fieldset:has-text("recurrent chest infection") button:has-text("Yes")')
      .first()
      .click();
    await page.locator('fieldset:has-text("frequent choking episodes") button:has-text("Yes")').first().click();
    await page.getByRole("button", { name: "Evaluate Risk" }).click();
    await page.waitForTimeout(300);
    assert((await page.locator("text=high risk").count()) > 0, "High-risk result not shown");

    await page.goto(`${BASE_URL}/toolkit`);
    await page.waitForTimeout(300);
    const numberInputs = page.locator('input[type="number"]');
    await numberInputs.nth(0).fill("1800");
    await numberInputs.nth(1).fill("3");
    await numberInputs.nth(2).fill("2");
    await numberInputs.nth(3).fill("7");
    await page.locator("textarea").fill("Automated e2e validation entry.");
    await page.getByRole("button", { name: "Save Daily Log" }).click();
    await page.waitForTimeout(350);
    assert((await page.locator("text=Last saved log").count()) > 0, "Daily log save confirmation missing");

    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForTimeout(500);
    assert((await page.locator("text=Log History").count()) > 0, "Dashboard log history section missing");
    assert((await page.locator("text=1800").count()) > 0, "Saved hydration value not visible on dashboard");

    await page.goto(`${BASE_URL}/knowledge-base`);
    await page.waitForTimeout(300);
    await page.getByPlaceholder("Search e.g. choking, chapati, hydration...").fill("chapati");
    await page.waitForTimeout(300);
    assert(
      (await page.locator("text=Can I eat normal chapati if I have swallowing difficulty?").count()) > 0,
      "Knowledge-base search did not return chapati FAQ"
    );

    await page.goto(`${BASE_URL}/counselor`);
    await page.waitForTimeout(400);
    assert((await page.locator("text=high risk").count()) > 0, "Counselor page missing high-risk badge");
    const summaryValue = await page.locator("textarea").first().inputValue();
    assert(summaryValue.includes("HIGH"), "Counselor summary not populated with latest risk info");

    await browser.close();
    console.log("E2E validation passed.");
  } finally {
    previewProcess.kill("SIGTERM");
  }
}

run().catch((error) => {
  console.error(`E2E validation failed: ${error.message}`);
  process.exit(1);
});
