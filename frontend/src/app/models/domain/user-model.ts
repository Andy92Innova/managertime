export class UserModel {
  user_id !: number;
  user_name !: string;
  email !: string;
  hash_password !: string;
  salt !: string;
  actived !: boolean;
  agree_terms !: boolean;

  constructor(
    user_name: string,
    email: string,
    hash_password: string,
    salt: string,
    agree_terms: boolean
  ) {
      this.user_name = user_name;
      this.email = email;
      this.hash_password = hash_password;
      this.salt = salt;
      this.agree_terms = agree_terms;
  }

  hashPass():void{
    //todo convert hash here
  }

}
