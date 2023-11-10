export class CreateRevenueDto {
  title: string;
  description: string;
  recurrence: string;
  userId: number;
  value: number;
}

export class FindAllRevenuesDto {
  skip?: number;
  take?: number;
  userId: number;
}

export class UpdateRevenueDto {
  title?: string;
  description?: string;
  recurrence?: string;
  value?: number;
}