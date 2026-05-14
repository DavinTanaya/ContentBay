export interface LoginValues {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreedTerms: boolean;
}
