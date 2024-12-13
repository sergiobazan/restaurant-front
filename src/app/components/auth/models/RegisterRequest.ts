export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  birthDay: Date;
  role: "CLIENT" | "OWNER";
}