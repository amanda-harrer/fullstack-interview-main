import { Membership, MembershipPeriod } from "../types/membership.types";
import {
  ListMembershipResponse,
  MembershipPeriodResponse,
} from "../types/membership.types";
import { formatDate } from "../utils/dateUtils";

// Format Membership for List response (renames 'user' to 'userId') and formats dates
export function formatMembershipForList(
  membership: Membership,
): ListMembershipResponse {
  const { user, ...rest } = membership;
  return {
    ...rest,
    userId: user,
    validFrom: formatDate(membership.validFrom),
    validUntil: formatDate(membership.validUntil),
  };
}

// Format MembershipPeriod for List response (dates as strings)
export function formatMembershipPeriodForList(
  period: MembershipPeriod,
): MembershipPeriodResponse {
  return {
    ...period,
    start: formatDate(period.start),
    end: formatDate(period.end),
  };
}
