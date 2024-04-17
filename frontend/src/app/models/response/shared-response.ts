export interface MessageResponse{
  message: string;
}

export interface AddResponse extends MessageResponse{
  was_inserted : boolean;
}

export interface DeleteResponse extends MessageResponse{
  was_deleted : boolean;
}
