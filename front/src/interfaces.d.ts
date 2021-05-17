
interface Task {

    content: string,
    status: boolean

}
interface TaskList {

    _id: string,
    title: string,
    user: string,
    tasks: Task[],

}