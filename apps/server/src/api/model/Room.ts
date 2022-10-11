export interface Room {
  id: string;
  title: string;
  createdAt: number;
  isOpen: boolean;
  difficulty: "easy" | "normal" | "hard";
}
