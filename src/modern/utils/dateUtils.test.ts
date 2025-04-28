import { formatDate, addInterval } from "./dateUtils";

describe("dateUtils", () => {
  describe("formatDate", () => {
    it("should format a date to YYYY-MM-DD", () => {
      const date = new Date("2023-03-15T12:00:00Z");
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe("2023-03-15");
    });
  });

  describe("addInterval", () => {
    it("should add months to a date when interval is 'monthly'", () => {
      const date = new Date("2023-01-15");
      const newDate = addInterval(date, "monthly", 2);
      expect(newDate.toISOString().split("T")[0]).toBe("2023-03-15");
    });

    it("should add years to a date when interval is 'yearly'", () => {
      const date = new Date("2023-01-15");
      const newDate = addInterval(date, "yearly", 1);
      expect(newDate.toISOString().split("T")[0]).toBe("2024-01-15");
    });

    it("should add weeks to a date when interval is 'weekly'", () => {
      const date = new Date("2023-01-15");
      const newDate = addInterval(date, "weekly", 2);
      expect(newDate.toISOString().split("T")[0]).toBe("2023-01-29");
    });

    it("should return the same date if interval is not recognized", () => {
      const date = new Date("2023-01-15");
      const newDate = addInterval(date, "daily", 5);
      expect(newDate.toISOString().split("T")[0]).toBe("2023-01-15");
    });
  });
});
