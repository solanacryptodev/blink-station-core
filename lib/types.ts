import { CoreMessage } from 'ai'
import { OrderSide } from "@staratlas/factory";
import { WithId } from 'mongodb';

export interface AssetProps {
  currentData?: StarRating;
  image?: string;
  asset?: string;
  currency?: string;
}

export interface ExampleDataProps {
  assetName: string;
  exampleData: StarRating
}

export interface StarRating {
  totalBuyQuantity?: number;
  totalSellQuantity?: number;
  totalBuyPrice?: number;
  totalSellPrice?: number;
  lowestSellPrice?: number;
  averageSellPrice?: number;
  demandRating?: number;
  priceCompetitivenessRating?: number;
  starRating?: number;
  classLiquidity?: number;
  volumeRating?: number;
  totalTradingVolume?: number;
  averageClassBuyPrice?: number;
  averageClassVolume?: number;
}

export interface TabProps {
  tabOne: string;
  tabTwo: string;
  tabThree: string;
  tabFour: string;
  upgrade?: boolean;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface MembershipSubscription {
  playerName: string;
  publicKey: string;
  subscriptionStatus: 'Traveler' | 'Specialist' | 'Captain' | 'Commander';
  tokenCount: number;
  createdAt?: string; // when the account was first created
  upgradedAt?: string; // when the player last upgraded or re-subscribed
  subscribedOn?: string | null; // when the player first subscribed
  membershipStartDate?: Date | null;
  membershipEndDate?: Date | null;
  paidInFull?: boolean; // manually updated and reset when subscription is accounted for in Mongo
  lastSeenOn?: string; // only used to track when a player was actually using the chat features of the app. Daily active users.
  chatLogs?: Message[];
}

export type MembershipSubscriptionDocument = WithId<Document> | MembershipSubscription;

export type MembershipSubscriptionWithoutId = Omit<MembershipSubscriptionDocument, '_id'>

export type Message = CoreMessage & {
  id: string
}

export interface ExamplePrompts {
  heading: string;
  subheading: string;
  message: string;
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

export interface ReturnedOrders {
  assetName: string
  assetParam?: string
  orderType: OrderSide
  orderId: string
  price: number | string
  quantity: number | string
  owner: string
  currency?: string
}

export interface OpenOrders {
  ownerKey: string
  assetName: string
}
