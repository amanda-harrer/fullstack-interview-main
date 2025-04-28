import { validateMembershipInput } from "./membershipValidator";

describe("validateMembershipInput", () => {
  it('should return "missingMandatoryFields" if name or recurringPrice is missing', () => {
    expect(validateMembershipInput({})).toBe("missingMandatoryFields");
    expect(validateMembershipInput({ name: "John" })).toBe(
      "missingMandatoryFields",
    );
    expect(validateMembershipInput({ recurringPrice: 50 })).toBe(
      "missingMandatoryFields",
    );
  });

  it('should return "negativeRecurringPrice" if recurringPrice is negative', () => {
    expect(validateMembershipInput({ name: "John", recurringPrice: -10 })).toBe(
      "negativeRecurringPrice",
    );
  });

  it('should return "cashPriceBelow100" if recurringPrice > 100 and paymentMethod is "cash"', () => {
    expect(
      validateMembershipInput({
        name: "John",
        recurringPrice: 150,
        paymentMethod: "cash",
      }),
    ).toBe("cashPriceBelow100");
  });

  it('should return "billingPeriodsMoreThan12Months" if billingInterval is "monthly" and billingPeriods > 12', () => {
    expect(
      validateMembershipInput({
        name: "John",
        recurringPrice: 50,
        billingInterval: "monthly",
        billingPeriods: 13,
      }),
    ).toBe("billingPeriodsMoreThan12Months");
  });

  it('should return "billingPeriodsLessThan6Months" if billingInterval is "monthly" and billingPeriods < 6', () => {
    expect(
      validateMembershipInput({
        name: "John",
        recurringPrice: 50,
        billingInterval: "monthly",
        billingPeriods: 5,
      }),
    ).toBe("billingPeriodsLessThan6Months");
  });

  it('should return "billingPeriodsMoreThan10Years" if billingInterval is "yearly" and billingPeriods > 10', () => {
    expect(
      validateMembershipInput({
        name: "John",
        recurringPrice: 50,
        billingInterval: "yearly",
        billingPeriods: 11,
      }),
    ).toBe("billingPeriodsMoreThan10Years");
  });

  it('should return "billingPeriodsLessThan3Years" if billingInterval is "yearly" and billingPeriods < 3', () => {
    expect(
      validateMembershipInput({
        name: "John",
        recurringPrice: 50,
        billingInterval: "yearly",
        billingPeriods: 2,
      }),
    ).toBe("billingPeriodsLessThan3Years");
  });

  it('should return "invalidBillingPeriods" if billingInterval is not "monthly" or "yearly"', () => {
    expect(
      validateMembershipInput({
        name: "John",
        recurringPrice: 50,
        billingInterval: "weekly",
        billingPeriods: 10,
      }),
    ).toBe("invalidBillingPeriods");
  });

  it("should return null for valid input", () => {
    expect(
      validateMembershipInput({
        name: "John",
        recurringPrice: 50,
        billingInterval: "monthly",
        billingPeriods: 6,
      }),
    ).toBeNull();
    expect(
      validateMembershipInput({
        name: "John",
        recurringPrice: 50,
        billingInterval: "yearly",
        billingPeriods: 3,
      }),
    ).toBeNull();
  });
});
