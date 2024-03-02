import axios from "axios";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function OPTIONS(request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}

const addDataToSheets = async (data) => {
  try {
    const jsonData = data;
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbzhUuFj5sy5RFTOy__d7JYn3q3VjCE9rgp-KyuWTDd0wa2QMq7RdJJhLZ8N0UAZ_qs_Yg/exec",
      jsonData
    );
    console.log(response.data);
    const status = await response.status;
    if (status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const POST = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      issue,
      ip,
      country,
      city,
      state,
      timezone,
      isp,
      ispOrganization,
      platform,
      browser,
      userAgent,
    } = await req.json();

    const emailMessage = `
      A new inquiry has been received:

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Issue: ${issue}
      IP: ${ip}
      City: ${city}
      Country: ${country}
      State: ${state}
      Timezone: ${timezone}
      ISP: ${isp}
      ISP Organization: ${ispOrganization}
      Platform: ${platform}
      Browser: ${browser}
      User Agent: ${userAgent}
    `;

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Phone", phone);
    formData.append("Issue", issue);
    formData.append("IP", ip);
    formData.append("Country", country);
    formData.append("City", city);
    formData.append("State", state);
    formData.append("Timezone", timezone);
    formData.append("ISP", isp);
    formData.append("ISPOrganization", ispOrganization);
    formData.append("Platform", platform);
    formData.append("Browser", browser);
    formData.append("UserAgent", userAgent);

    const dataAdded = await addDataToSheets(formData);

    if (!dataAdded) {
      return NextResponse.json(
        {
          message: `Something went wrong. Please try again later.`,
        },
        { status: 500 }
      );
    }

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
        message: `Thanks for reaching out!`,
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
