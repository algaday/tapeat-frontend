import {  RestaurantBranchV2 } from '../model/schema';

export type GetRestaurantBranchByIdResponse = RestaurantBranchV2;
export type GetRestaurantBranchByIdRequest = {
  restaurantBranchId: string;
};
