
export interface RegisterResponse{
  was_inserted: string,
  message: string
}


export interface GetUserResponse {
  user_id: number,
  user_name: string,
  user_email: string,
  hash_password: string,
  agree_terms: boolean
}
