import { CoreMessage } from 'ai'
import { OrderSide } from "@staratlas/factory";
import { ObjectId } from 'mongodb';

export interface TabProps {
  tabOne: string;
  tabTwo: string;
  tabThree: string;
  tabFour: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface MembershipSubscription {
  playerName: string;
  publicKey: string;
  subscriptionStatus: 'traveler' | 'specialist' | 'captain' | 'commander';
  tokenCount: number;
  createdAt?: string;
  updatedAt?: string;
  membershipStartDate?: string;
  membershipEndDate?: string;
}

export type Message = CoreMessage & {
  id: string
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
