import pool from "@/helpers/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userCurl } = await req.json();
    const { rows } = await pool.query(
      `SELECT curl FROM gsb ORDER BY similarity(curl, $1) LIMIT 1;`,
      [userCurl]
    );

    return NextResponse.json({
      // result: userCurl ? userCurl : "No match found",
      result: rows.length > 0 ? rows[0].curl : "No match found",
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
};
