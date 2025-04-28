import { RawMembership, RawMembershipPeriod } from "../types/membership.types";
import { Membership, MembershipPeriod } from "../types/membership.types";

export function parseMembership(raw: RawMembership): Membership {
  return {
    id: raw.id,
    uuid: raw.uuid,
    name: raw.name,
    user: raw.userId,
    state: raw.state,
    validFrom: new Date(raw.validFrom),
    validUntil: new Date(raw.validUntil),
    assignedBy: raw.assignedBy,
    paymentMethod: raw.paymentMethod,
    recurringPrice: raw.recurringPrice,
    billingPeriods: raw.billingPeriods,
    billingInterval: raw.billingInterval,
  };
}

export function parseMembershipPeriod(
  raw: RawMembershipPeriod,
): MembershipPeriod {
  return {
    id: raw.id,
    uuid: raw.uuid,
    membership: raw.membership,
    start: new Date(raw.start),
    end: new Date(raw.end),
    state: raw.state,
  };
}
