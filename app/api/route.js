import ExcelJS from "exceljs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import parser from "simple-excel-to-json";

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

async function appendToExcel(data) {
  // Load the existing workbook

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./public/data.xlsx");

  // Get the worksheet you want to append data to
  const worksheet = workbook.getWorksheet(workbook.worksheets[0].name);

  // Append new rows
  const dataToAppend = [data];

  worksheet.addRows(dataToAppend);

  // Save the workbook
  await workbook.xlsx.writeFile("./public/data.xlsx");
  console.log("Data appended successfully.");
}
export const GET = async (req, res) => {
  try {
    const doc = parser.parseXls2Json("./public/data.xlsx");

    return NextResponse.json(
      {
        data: doc[0],
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

    // const appendedData = await appendToExcel([
    //   name,
    //   email,
    //   phone,
    //   issue,
    //   ip,
    //   city,
    //   country,
    //   state,
    //   timezone,
    //   isp,
    //   ispOrganization,
    //   platform,
    //   browser,
    //   userAgent,
    // ]);

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
