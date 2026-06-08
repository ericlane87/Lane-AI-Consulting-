const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const calcHours = document.querySelector("[data-calc-hours]");
const calcRate = document.querySelector("[data-calc-rate]");
const calcPercent = document.querySelector("[data-calc-percent]");
const calcPercentLabel = document.querySelector("[data-calc-percent-label]");
const calcWeekly = document.querySelector("[data-calc-weekly]");
const calcMonthly = document.querySelector("[data-calc-monthly]");
const calcYearly = document.querySelector("[data-calc-yearly]");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
};

const closeNav = () => {
  document.body.classList.remove("nav-open");
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeNav();
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeNav();
  }
});

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const updateCalculator = () => {
  if (!calcHours || !calcRate || !calcPercent) {
    return;
  }

  const hours = Number(calcHours.value) || 0;
  const rate = Number(calcRate.value) || 0;
  const reduction = (Number(calcPercent.value) || 0) / 100;
  const weekly = hours * rate * reduction;
  const monthly = weekly * 4.33;
  const yearly = weekly * 52;

  calcPercentLabel.textContent = `${calcPercent.value}%`;
  calcWeekly.textContent = money.format(weekly);
  calcMonthly.textContent = money.format(monthly);
  calcYearly.textContent = money.format(yearly);
};

[calcHours, calcRate, calcPercent].forEach((input) => {
  input?.addEventListener("input", updateCalculator);
});

updateHeader();
updateCalculator();
