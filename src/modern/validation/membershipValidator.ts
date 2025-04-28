export function validateMembershipInput(body: any): string | null {
  if (!body.name || body.recurringPrice === undefined) {
    return "missingMandatoryFields";
  }

  if (body.recurringPrice < 0) {
    return "negativeRecurringPrice";
  }

  if (body.recurringPrice > 100 && body.paymentMethod === "cash") {
    return "cashPriceBelow100";
  }

  if (body.billingInterval === "monthly") {
    if (body.billingPeriods > 12) {
      return "billingPeriodsMoreThan12Months";
    }
    if (body.billingPeriods < 6) {
      return "billingPeriodsLessThan6Months";
    }
  } else if (body.billingInterval === "yearly") {
    if (body.billingPeriods > 10) {
      return "billingPeriodsMoreThan10Years";
    }
    if (body.billingPeriods < 3) {
      return "billingPeriodsLessThan3Years";
    }
  } else {
    return "invalidBillingPeriods";
  }

  return null;
}
