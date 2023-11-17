export class CreateRevenueDto {
  title: string;
  description: string;
  recurrence: string;
  user_id: number;
  value: number;
}

export class FindAllRevenuesDto {
  skip?: number;
  take?: number;
  user_id: number;
}

export class UpdateRevenueDto {
  title?: string;
  description?: string;
  recurrence?: string;
  value?: number;
}