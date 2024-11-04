export default async function getUserIdFromBackend(userInfo,setUserfunc) {
    const url = 'https://j82nb6pzfe.execute-api.us-east-1.amazonaws.com/Prod/hello';

    const queryString = new URLSearchParams(userInfo).toString()
    const fullUrl = `${url}?${queryString}`;
    let resp = await fetch(fullUrl);
    let res = await resp.json();
    localStorage.setItem('userId', res.userid)
    setUserfunc(res.userid)
    return res;
}