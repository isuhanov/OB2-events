export interface Project {
    project_id: number | null,
    project_name: string,
    create_date: string,
    deadline: string,
    price: number,
    descr: string,
    customer_name: string,
    customer_id?: number,
    status: string
}