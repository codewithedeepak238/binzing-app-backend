const forgotPasswordTemplate=({name, otp})=>{
    return `
        <div>
            <h2 style="font-size:26px; font-weight:600">Trouble signing in?</h2>
            <p>Dear, ${name}</p>
            <p>We've received a request to reset the password for this user account.</p>
            <div style="background-color:yellow; color:black; font-size:22px; font-weight:400">
                ${otp}
            </div>
            <p>If you didn't ask to reset your password, you can ignore this email.</p>
            <p>Thanks,<br/>
The BinZing team</p>
        </div>
    `
}

export default forgotPasswordTemplate;