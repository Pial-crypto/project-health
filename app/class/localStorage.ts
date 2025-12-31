type Role = "admin" | "user" | "guest"; 
export class UserStorage {
  private storageKey = "user";

  constructor(
    public email: string,
    public name: string,
    public role: Role
  ) {}

 
  save(): void {
    try {
      const data = {
        email: this.email,
        name: this.name,
        role: this.role,
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  }


  static load(): UserStorage | null {
    try {
      const data = localStorage.getItem("user");
      if (!data) return null;

      const parsed = JSON.parse(data);
      return new UserStorage(parsed.email, parsed.name, parsed.role);
    } catch (error) {
      console.error("Failed to load user:", error);
      return null;
    }
  }


  static remove(): void {
    localStorage.removeItem("user");
  }
}