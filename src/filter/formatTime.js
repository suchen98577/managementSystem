export default (time)=>{
    let date=new Date(time);
    let year=date.getFullYear();
    let month=((date.getMonth()+1)+"").padStart(2,"0");
    let day=(date.getDate()+"").padStart(2,"0");
    let hour=(date.getHours()+"").padStart(2,"0");
    let minute=(date.getMinutes()+"").padStart(2,"0");
    let second=(date.getSeconds()+"").padStart(2,"0");
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}