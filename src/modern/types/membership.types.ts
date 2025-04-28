// Core Types

// Represents a single membership
export interface Membership {
  id: number;
  uuid: string;
  name: string;
  user: number;
  state: "active" | "pending" | "expired";
  validFrom: Date;
  validUntil: Date;
  assignedBy: string;
  paymentMethod: string | null;
  recurringPrice: number;
  billingPeriods: number;
  billingInterval: "monthly" | "yearly" | "weekly";
}

// Represents a membership period, linked to a specific membership
export interface MembershipPeriod {
  id: number;
  uuid: string;
  membership: number; // Foreign key to Membership
  start: Date;
  end: Date;
  state: "planned" | "active" | "expired" | "canceled"; 
}

// ----------------------------------------------
// Legacy Response Types (for legacy compatibility)
// ----------------------------------------------

// Membership API response (dates are returned as strings instead of Date objects)
export interface MembershipResponse
  extends Omit<Membership, "validFrom" | "validUntil"> {
  validFrom: string;
  validUntil: string;
}

// MembershipPeriod API response (dates as strings)
export interface MembershipPeriodResponse
  extends Omit<MembershipPeriod, "start" | "end"> {
  start: string;
  end: string;
}

// Membership API response for listing memberships (renames 'user' to 'userId')
export interface ListMembershipResponse
  extends Omit<MembershipResponse, "user"> {
  userId: number;
}

// Special type for Membership when we want to omit `assignedBy`
export type MembershipWithoutAssignedBy = Omit<Membership, "assignedBy">;

// ----------------------------------------------
// Raw Data Types (Used for raw input data)
// ----------------------------------------------

// Raw data representation for membership (before it's parsed into the actual type)
export interface RawMembership {
  id: number;
  uuid: string;
  name: string;
  userId: number; 
  state: "active" | "pending" | "expired";
  validFrom: string; 
  validUntil: string; 
  assignedBy: string;
  paymentMethod: string | null;
  recurringPrice: number;
  billingPeriods: number;
  billingInterval: "monthly" | "yearly" | "weekly";
}

// Raw data representation for a membership period (before it's parsed into the actual type)
export interface RawMembershipPeriod {
  id: number;
  uuid: string;
  membership: number; 
  start: string; 
  end: string; 
  state: "planned" | "active" | "expired" | "canceled"; 
}
