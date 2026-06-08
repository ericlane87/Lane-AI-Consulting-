const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const calcPeople = document.querySelector("[data-calc-people]");
const calcHours = document.querySelector("[data-calc-hours]");
const calcRate = document.querySelector("[data-calc-rate]");
const calcValue = document.querySelector("[data-calc-value]");
const calcPercent = document.querySelector("[data-calc-percent]");
const calcPercentLabel = document.querySelector("[data-calc-percent-label]");
const calcOpportunity = document.querySelector("[data-calc-opportunity]");
const calcOpportunityLabel = document.querySelector("[data-calc-opportunity-label]");
const calcWeekly = document.querySelector("[data-calc-weekly]");
const calcMonthly = document.querySelector("[data-calc-monthly]");
const calcYearly = document.querySelector("[data-calc-yearly]");
const calcHoursFreed = document.querySelector("[data-calc-hours-freed]");
const calcOpportunityMonthly = document.querySelector("[data-calc-opportunity-monthly]");
const calcOpportunityYearly = document.querySelector("[data-calc-opportunity-yearly]");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

if (!window.location.hash) {
  window.scrollTo(0, 0);
  window.addEventListener("load", () => window.scrollTo(0, 0), { once: true });
}

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
  if (!calcPeople || !calcHours || !calcRate || !calcValue || !calcPercent || !calcOpportunity) {
    return;
  }

  const people = Number(calcPeople.value) || 0;
  const hours = Number(calcHours.value) || 0;
  const rate = Number(calcRate.value) || 0;
  const productiveValue = Number(calcValue.value) || 0;
  const reduction = (Number(calcPercent.value) || 0) / 100;
  const opportunityShare = (Number(calcOpportunity.value) || 0) / 100;
  const freedWeeklyHours = people * hours * reduction;
  const weekly = freedWeeklyHours * rate;
  const monthly = weekly * 4.33;
  const yearly = weekly * 52;
  const monthlyFreedHours = freedWeeklyHours * 4.33;
  const monthlyOpportunity = monthlyFreedHours * productiveValue * opportunityShare;
  const yearlyOpportunity = monthlyOpportunity * 12;

  calcPercentLabel.textContent = `${calcPercent.value}%`;
  calcOpportunityLabel.textContent = `${calcOpportunity.value}%`;
  calcWeekly.textContent = money.format(weekly);
  calcMonthly.textContent = money.format(monthly);
  calcYearly.textContent = money.format(yearly);
  calcHoursFreed.textContent = Math.round(monthlyFreedHours).toLocaleString("en-US");
  calcOpportunityMonthly.textContent = money.format(monthlyOpportunity);
  calcOpportunityYearly.textContent = money.format(yearlyOpportunity);
};

[calcPeople, calcHours, calcRate, calcValue, calcPercent, calcOpportunity].forEach((input) => {
  input?.addEventListener("input", updateCalculator);
});

updateHeader();
updateCalculator();
