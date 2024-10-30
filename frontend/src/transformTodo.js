export function transformTodo(data) {
 
 
    data = data.map(item => {
        item = Object.entries(item).flat();
        //userId added here
        let userId = localStorage.getItem('userId');
       // userOjbect = JSON.parse(userOjbect)
        item.unshift(userId);

        item.unshift('DEFAULT');

        return item;
    });
    return data;
}
