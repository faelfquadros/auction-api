export interface IRequest {
  name: string;
  description: string;
  user_id: string;
  products?: string[];
}

export interface IProducts {
  id: string;
  name: string;
  description: string;
  owner_user_id: string;
}

export interface IResponse {
  id: string;
  name: string;
  description: string;
  user_id: string;
  products: IProducts[];
}
