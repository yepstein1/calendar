export default async function getUserIdFromBackend(userInfo)
{
    const url = 'https://j82nb6pzfe.execute-api.us-east-1.amazonaws.com/Prod/hello';
  
    const queryString = new URLSearchParams(userInfo).toString()
    const fullUrl = `${url}?${queryString}`;
    let resp = await fetch(fullUrl);
    let res = await resp.json();
    console.log(` res in getUserIdFromBackend ${JSON.stringify(res)}`)
    localStorage.setItem('userId',res.userid)
   return  res;
}