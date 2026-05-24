import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export const sendBookingEmail = async (email: string, movie: string) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Booking Confirmed`,
        html: `
            <h1>Booking Confirmed</h1>
            <p>Your booking for ${movie} is confirmed.</p>
        `
    })
}