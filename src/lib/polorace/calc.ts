import { prices } from "./content";

export type ClientType = "direct" | "producer";
export type FrameCount = 8 | 10;

export type QuoteInput = {
  participants: number;
  clientType: ClientType;
  frames: FrameCount;
  english: boolean;
  orgQuestions: boolean;
  chaser: boolean;
  album: boolean;
  highlight: boolean;
  km: number;
};

export type Quote = {
  participants: number;
  groups: number;
  cameras: number;
  photos: number;
  perPersonRate: number;
  activity: number;
  travel: number;
  subtotal: number;
  vat: number;
  total: number;
  deposit: number;
  average: number;
};

export function clampParticipants(value: number): number {
  if (!Number.isFinite(value)) return prices.minParticipants;
  return Math.max(prices.minParticipants, Math.round(value));
}

export function quoteFrom(input: QuoteInput): Quote {
  const participants = clampParticipants(input.participants);
  const rate =
    input.clientType === "direct" ? prices.directPerPerson : prices.producerPerPerson;
  const base = rate * participants;
  let activity = input.frames === 8 ? Math.round((base * 9) / 10) : base;
  if (input.english) activity = Math.round(activity * prices.englishFactor);
  if (input.orgQuestions) activity += prices.orgPerPerson * participants;
  if (input.chaser) activity += prices.chaserPerPerson * participants;
  if (input.album) activity += prices.album;
  if (input.highlight) activity += prices.highlight;

  const km = Number.isFinite(input.km) ? Math.max(0, input.km) : 0;
  const travel = Math.round(km * prices.travelPerKm);
  const subtotal = activity + travel;
  const vat = Math.round(subtotal * prices.vatRate);
  const total = subtotal + vat;
  const deposit = Math.round(total * prices.depositRate);
  const groups = Math.ceil(participants / prices.maxPerGroup);

  return {
    participants,
    groups,
    cameras: groups,
    photos: groups * prices.photosPerGroup,
    perPersonRate: input.frames === 8 ? Math.round((rate * 9) / 10) : rate,
    activity,
    travel,
    subtotal,
    vat,
    total,
    deposit,
    average: Math.round(total / participants),
  };
}

export function formatIls(value: number): string {
  return `₪${Math.round(value).toLocaleString("he-IL")}`;
}
