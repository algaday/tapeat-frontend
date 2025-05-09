import { User } from '../api/type';

export type Address = {
  coordinates: string;
  street: string;
  flat?: string;
  floor?: string;
  entrance?: string;
  type: DeliveryOption;
};

export type UserState = {
  user: User | null;
  address: Address | null;
  deliveryOption: DeliveryOption;
};

export type DeliveryOption = 'delivery' | 'pick-up' | 'restaurant';
