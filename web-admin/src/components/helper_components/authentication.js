export const tokenCookies = ()=> {
    var result = ""
    const arr = document.cookie.split("; ")
    arr.forEach(element => {
        const search = "token="
        const searchToken = element.search(search)
        if(searchToken > -1){
            result = element.slice(search.length,element.length)
            
        }
    });
    return result
    
}