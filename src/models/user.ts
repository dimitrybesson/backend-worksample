class User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
  
    constructor(id: number, name: string, email: string, created_at: Date) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.created_at = created_at;
    }
}
  
export default User;
  