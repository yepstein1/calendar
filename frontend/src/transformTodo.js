export function transformTodo(data) {
 
    //console.log(result);
    data = data.map(item => {
        item = Object.entries(item).flat();
        item.unshift(1);

        item.unshift('DEFAULT');

        return item;
    });
    return data;
}
