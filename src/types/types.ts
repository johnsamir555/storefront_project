// Export the type "UserType"
export type UserType = {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  password?: string;
};
// Export the type "ProductType"
export type ProductType = {
  productId?: number;
  productName: string;
  productPrice: number;
};
// Export the type "PurchaseListType"
export type PurchaseListType = {
  productId?: number;
  productQuantity: number;
};
// Export the type "OrderType"
export type OrderType = {
  id?: number;
  products?: PurchaseListType[];
  userId?: number;
  status: 'active' | 'complete';
};
