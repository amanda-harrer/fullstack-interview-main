import { listMemberships, createMembership } from "./membershipService";
import membershipsData from "../../data/memberships.json";
import membershipPeriodsData from "../../data/membership-periods.json";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

jest.mock(
  "../../data/memberships.json",
  () =>
    [] as Array<{
      id: number;
      name: string;
      user: number;
      state: string;
      uuid: string;
    }>,
);
jest.mock(
  "../../data/membership-periods.json",
  () => [] as Array<{ membership: number; start: string; end: string }>,
);

describe("membershipService", () => {
  describe("listMemberships", () => {
    it("should list all memberships with their periods", () => {
      (membershipsData as any[]).push(
        {
          id: 1,
          name: "Membership 1",
          user: 123,
          validFrom: "2023-01-01",
          validUntil: "2023-12-31",
          assignedBy: "Admin",
          paymentMethod: "credit_card",
          recurringPrice: 50,
          billingPeriods: 12,
          billingInterval: "monthly",
          state: "active",
          uuid: "mock-uuid-1",
        },
        {
          id: 2,
          name: "Membership 2",
          user: 456,
          state: "pending",
          validFrom: "2023-01-01",
          validUntil: "2023-12-31",
          assignedBy: "Admin",
          paymentMethod: "credit_card",
          recurringPrice: 50,
          billingPeriods: 12,
          billingInterval: "monthly",
          uuid: "mock-uuid-2",
        },
      );

      (membershipPeriodsData as any[]).push(
        {
          membership: 1,
          start: "2023-01-01",
          end: "2023-02-01",
        },
        {
          membership: 2,
          start: "2023-02-01",
          end: "2023-03-01",
        },
      );

      const result = listMemberships();

      expect(result).toHaveLength(2);
      expect(result[0].membership.name).toBe("Membership 1");
      expect(result[0].periods).toHaveLength(1);
      expect(result[0].periods[0].start).toEqual("2023-01-01");
      expect(result[0].periods[0].end).toEqual("2023-02-01");

      expect(result[1].membership.name).toBe("Membership 2");
      expect(result[1].periods).toHaveLength(1);
      expect(result[1].periods[0].start).toEqual("2023-02-01");
      expect(result[1].periods[0].end).toEqual("2023-03-01");
    });
  });

  describe("createMembership", () => {
    it("should create a new membership and its periods", () => {
      const mockUuid = "mock-uuid";
      (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

      const body = {
        name: "New Membership",
        userId: 3000,
        assignedBy: "Admin",
        validFrom: "2023-01-01",
        billingInterval: "monthly",
        billingPeriods: 7,
        paymentMethod: "credit_card",
        recurringPrice: 100,
      };

      const result = createMembership(body);

      expect(result).toHaveProperty("membership");
      expect(result).toHaveProperty("membershipPeriods");

      const { membership, membershipPeriods } = result as any;

      expect(membership.name).toBe("New Membership");
      expect(membership.user).toBe(3000);
      expect(membership.state).toBe("expired");
      expect(membership.validFrom).toEqual(
        new Date("2023-01-01T00:00:00.000Z"),
      );
      expect(membership.validUntil).toEqual(
        new Date("2023-07-31T23:00:00.000Z"),
      );
      expect(membership.uuid).toBe(mockUuid);

      expect(membershipPeriods).toHaveLength(7);
      expect(membershipPeriods[0].membership).toBe(membership.id);
      expect(membershipPeriods[0].state).toBe("planned");
      expect(membershipPeriods[0].start).toEqual(
        new Date("2023-01-01T00:00:00.000Z"),
      );
      expect(membershipPeriods[0].end).toEqual(
        new Date("2023-02-01T00:00:00.000Z"),
      );
    });

    it("should return an error if validation fails", () => {
      const body = {
        name: "",
        billingInterval: "month",
        billingPeriods: 3,
      };

      const result = createMembership(body);

      expect(result).toHaveProperty("error");
      if ("error" in result) {
        expect(result.error).toBeDefined();
      }
    });
  });
});
