export class FilterExpense {
    dateRange: Date[];
    category: number;
    description: string;
}

export class ExpenseModel {
    idExpense: number;
    idCategory: number;
    descriptionCategory: string;
    description: string;
    dateExpense: Date;
    amount: number;
}