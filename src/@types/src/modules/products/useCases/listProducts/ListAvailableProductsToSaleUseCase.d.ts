export interface IRequest {
  name?: string;
  description?: string;
  owner_user_id: string;
}

interface IResponse {
  id: string;
  name: string;
  description: string;
  owner_user_id: string;
}
