export class FilterIncome{
    dateRange: Date[];
    category: number;
    description: string;
}

export class IncomeModel {
    idIncome: number;
    idCategory: number;
    descriptionCategory: string;
    description: string;
    dateIncome: Date;
    amount: number;
}