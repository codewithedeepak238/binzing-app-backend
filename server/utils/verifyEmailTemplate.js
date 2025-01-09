const verifyEmailTemplate = ({name, url})=>{
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registering at Blinkit</p>
    <a href=${url} style="color:white; background:blue; margin-top:10px">Verfiy Email</a>
    `
}
export default verifyEmailTemplate; 