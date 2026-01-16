import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    console.log("DELETE /api/delete-account triggered");

    // Skapar ett OK-svar
    const response = NextResponse.json({ success: true });

    // Ta bort ALLA cookies → garanterad logout
    response.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, "", {
        expires: new Date(0),
        httpOnly: true,
        path: "/",
      });
    });

    return response;
  } catch (err) {
    console.error("DELETE ACCOUNT ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
