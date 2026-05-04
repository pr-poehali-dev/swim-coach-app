export type Role = "athlete" | "coach";

export interface AthleteData {
  name: string;
  birthdate: string;
  gender: "male" | "female";
  city: string;
}

export interface CoachData extends AthleteData {
  education: string;
  educationOther?: string;
  experience: string;
  certificates: string;
}

export interface UserData {
  role: Role;
  email: string;
  profile: AthleteData | CoachData;
}
