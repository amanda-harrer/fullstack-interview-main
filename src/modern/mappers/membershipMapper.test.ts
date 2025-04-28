import { parseMembership, parseMembershipPeriod } from "./membershipMapper";
import { RawMembership, RawMembershipPeriod } from "../types/membership.types";

describe("parseMembership", () => {
  it("should correctly parse a RawMembership object into a Membership object", () => {
    const rawMembership: RawMembership = {
      id: 1,
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      name: "Premium Membership",
      userId: 42,
      state: "active",
      validFrom: "2023-01-01T00:00:00Z",
      validUntil: "2023-12-31T23:59:59Z",
      assignedBy: "admin",
      paymentMethod: "credit_card",
      recurringPrice: 29.99,
      billingPeriods: 12,
      billingInterval: "monthly",
    };

    const result = parseMembership(rawMembership);

    expect(result).toEqual({
      id: 1,
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      name: "Premium Membership",
      user: 42,
      state: "active",
      validFrom: new Date("2023-01-01T00:00:00Z"),
      validUntil: new Date("2023-12-31T23:59:59Z"),
      assignedBy: "admin",
      paymentMethod: "credit_card",
      recurringPrice: 29.99,
      billingPeriods: 12,
      billingInterval: "monthly",
    });
  });

  describe("parseMembershipPeriod", () => {
    it("should correctly parse a RawMembershipPeriod object into a MembershipPeriod object", () => {
      const rawMembershipPeriod: RawMembershipPeriod = {
        id: 101,
        uuid: "456e7890-e89b-12d3-a456-426614174001",
        membership: 1,
        start: "2023-01-01T00:00:00Z",
        end: "2023-06-30T23:59:59Z",
        state: "active",
      };

      const result = parseMembershipPeriod(rawMembershipPeriod);

      expect(result).toEqual({
        id: 101,
        uuid: "456e7890-e89b-12d3-a456-426614174001",
        membership: 1,
        start: new Date("2023-01-01T00:00:00Z"),
        end: new Date("2023-06-30T23:59:59Z"),
        state: "active",
      });
    });
  });
});
