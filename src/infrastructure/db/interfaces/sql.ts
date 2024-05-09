export type SQLDataBase = {
    query: (text: string, values?: any[]) => Promise<any>;
}