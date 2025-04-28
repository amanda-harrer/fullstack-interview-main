import {
  formatMembershipForList,
  formatMembershipPeriodForList,
} from "./membershipFormatters";
import { Membership, MembershipPeriod } from "../types/membership.types";
import { formatDate } from "../utils/dateUtils";

jest.mock("../utils/dateUtils", () => ({
  formatDate: jest.fn((date: Date) => `${date.toISOString().split("T")[0]}`),
}));

describe("formatMembershipForList", () => {
  it("should format membership correctly", () => {
    const membership: Membership = {
      id: 123,
      user: 200,
      validFrom: new Date("2023-01-01"),
      validUntil: new Date("2023-12-31"),
      uuid: "uuid-123",
      name: "Test Membership",
      state: "active",
      assignedBy: "admin",
      paymentMethod: "credit_card",
      recurringPrice: 29.99,
      billingPeriods: 12,
      billingInterval: "monthly",
    };

    const expected = {
      id: 123,
      userId: 200,
      validFrom: "2023-01-01",
      validUntil: "2023-12-31",
      uuid: "uuid-123",
      name: "Test Membership",
      state: "active",
      assignedBy: "admin",
      paymentMethod: "credit_card",
      recurringPrice: 29.99,
      billingPeriods: 12,
      billingInterval: "monthly",
    };

    const result = formatMembershipForList(membership);
    expect(result).toEqual(expected);
    expect(formatDate).toHaveBeenCalledWith(new Date("2023-01-01"));
    expect(formatDate).toHaveBeenCalledWith(new Date("2023-12-31"));
  });
});

describe("formatMembershipPeriodForList", () => {
  it("should format membership period correctly", () => {
    const period: MembershipPeriod = {
      id: 1,
      uuid: "uuid-456",
      membership: 123,
      state: "active",
      start: new Date("2023-01-01"),
      end: new Date("2023-12-31"),
    };

    const expected = {
      id: 1,
      uuid: "uuid-456",
      membership: 123,
      state: "active",
      start: "2023-01-01",
      end: "2023-12-31",
    };

    const result = formatMembershipPeriodForList(period);
    expect(result).toEqual(expected);
    expect(formatDate).toHaveBeenCalledWith(new Date("2023-01-01"));
    expect(formatDate).toHaveBeenCalledWith(new Date("2023-12-31"));
  });
});
