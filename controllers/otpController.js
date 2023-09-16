exports.generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = Date.now(); // Store the current timestamp
    return { otp, timestamp };
}

exports.isOTPValid = (otpData) => {
    const otp = otpData.otp;
    const timestamp = otpData.timestamp;
    const currentTime = Date.now();
    const expirationTime = 10 * 60 * 1000; // 10 minutes

    // Check if the OTP is correct and hasn't expired
    if (otp && (currentTime - timestamp <= expirationTime)) {
        return true; // OTP is valid
    }

    return false; // OTP is either incorrect or expired
    // const otpData = generateOTP();
    // console.log(isOTPValid(otpData));
}

exports.timeAndDate = () => {
    const date = new Date(Date.now())

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const year = date.getFullYear()
    const monthIndex = date.getMonth() //zero-based month index
    const monthName = monthNames[monthIndex] // Look up the month name
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const formattedTimeAndDate = `${monthName} ${day.toString().padStart(2, '0')}, ${year} || ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    return formattedTimeAndDate
}

/*
exports.generate = function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = Date.now(); // Store the current timestamp
    return { otp, timestamp };
}

exports.check = function isOTPValid(otpData) {
    const otp = otpData.otp;
    const timestamp = otpData.timestamp;
    const currentTime = Date.now();
    const expirationTime = 10 * 60 * 1000; // 10 minutes

    // Check if the OTP is correct and hasn't expired
    if (otp && (currentTime - timestamp <= expirationTime)) {
        return true; // OTP is valid
    }

    return false; // OTP is either incorrect or expired
    // const otpData = generateOTP();
    // console.log(isOTPValid(otpData));
}

exports.DateAndTime = function timeAndDate(){
    const date = new Date(Date.now())

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const year = date.getFullYear()
    const monthIndex = date.getMonth() //zero-based month index
    const monthName = monthNames[monthIndex] // Look up the month name
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const formattedTimeAndDate = `${monthName} ${day.toString().padStart(2, '0')}, ${year} || ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    return formattedTimeAndDate
}
*/