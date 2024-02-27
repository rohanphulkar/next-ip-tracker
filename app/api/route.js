import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const POST = async (req, res) => {
  try {
    const { name, email, phone, ip, city, country, deviceType } =
      await req.json();

    const emailMessage = `
        A new inquiry has been received:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        IP: ${ip}
        City: ${city}
        Country: ${country}
        Device Type: ${deviceType}
        `;
    const mailTransporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    });

    const mailDetails = {
      from: process.env.EMAIL_HOST_USER,
      to: process.env.RECIPIENT_ADDRESS,
      subject: `Ip Tracker Query`,
      text: emailMessage,
    };

    await mailTransporter.sendMail(mailDetails);
    return NextResponse.json(
      {
        message: `Thanks for reaching out! We'll get back to you shortly.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: `Something went wrong. Please try again later.`,
      },
      { status: 500 }
    );
  }
};
