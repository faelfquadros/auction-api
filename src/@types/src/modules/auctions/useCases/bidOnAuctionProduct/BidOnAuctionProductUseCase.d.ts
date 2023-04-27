export interface IRequest {
  auction_id: string;
  product_id: string;
  user_id: string;
  value: number;
}

export interface IResponse {
  user_id: string;
  value: number;
}
