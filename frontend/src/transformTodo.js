export function transformTodo(data) {
    data = data.map(task => {
        let date = Object.keys(task);
        return task[date].map(item => ({ [date]: item }));
    }).flat();

    //console.log(result);
    data = data.map(item => {
        item = Object.entries(item).flat();
        item.unshift(1);

        item.unshift('DEFAULT');

        return item;
    });
    return data;
}
