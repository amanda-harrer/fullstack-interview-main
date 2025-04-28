import {
  Membership,
  MembershipPeriod,
  MembershipWithoutAssignedBy,
} from "../types/membership.types";
import {
  formatMembershipForList,
  formatMembershipPeriodForList,
} from "../formats/membershipFormatters";
import {
  parseMembership,
  parseMembershipPeriod,
} from "../mappers/membershipMapper";
import { validateMembershipInput } from "../validation/membershipValidator";
import { addInterval } from "../utils/dateUtils";
import { v4 as uuidv4 } from "uuid";
import membershipsData from "../../data/memberships.json";
import membershipPeriodsData from "../../data/membership-periods.json";

// List all memberships and their periods
export function listMemberships() {
  const memberships = (membershipsData as any[]).map(parseMembership);
  const membershipPeriods = (membershipPeriodsData as any[]).map(
    parseMembershipPeriod,
  );

  return memberships.map((membership) => {
    const periods = membershipPeriods.filter(
      (period) => period.membership === membership.id,
    );
    return {
      membership: formatMembershipForList(membership),
      periods: periods.map(formatMembershipPeriodForList),
    };
  });
}

// Create a new membership and its periods
export function createMembership(
  body: any,
):
  | {
      membership: MembershipWithoutAssignedBy;
      membershipPeriods: MembershipPeriod[];
    }
  | { error: string } {
  const validationError = validateMembershipInput(body);
  if (validationError) {
    return { error: validationError };
  }

  const now = new Date();
  const validFrom = body.validFrom ? new Date(body.validFrom) : now;
  const validUntil = addInterval(
    validFrom,
    body.billingInterval,
    body.billingPeriods,
  );

  let state: Membership["state"] = "active";
  if (validFrom > now) {
    state = "pending";
  } else if (validUntil < now) {
    state = "expired";
  }

  const newMembership: Membership = {
    id: (membershipsData as any[]).length + 1,
    uuid: uuidv4(),
    name: body.name,
    user: body.userId || 2000,
    state,
    assignedBy: body.assignedBy,
    validFrom,
    validUntil,
    paymentMethod: body.paymentMethod ?? null,
    recurringPrice: body.recurringPrice,
    billingPeriods: body.billingPeriods,
    billingInterval: body.billingInterval,
  };

  const membershipPeriods: MembershipPeriod[] = [];
  let periodStart = validFrom;
  for (let i = 0; i < body.billingPeriods; i++) {
    const start = periodStart;
    const end = addInterval(start, body.billingInterval, 1);

    membershipPeriods.push({
      id: i + 1,
      uuid: uuidv4(),
      membership: newMembership.id,
      start,
      end,
      state: "planned",
    });

    periodStart = end;
  }

  const { assignedBy, ...membershipWithoutAssignedBy } = newMembership;

  return {
    membership: membershipWithoutAssignedBy,
    membershipPeriods: membershipPeriods,
  };
}
