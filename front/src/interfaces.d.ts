
interface Task {

    content: string,
    status: boolean,
    time: number

}
interface TaskList {

    _id: string,
    title: string,
    user: string,
    tasks: Task[],

}