export async function GET() {
  try {
    const response = await fetch("https://www.google.com");

    return Response.json({
      status: response.status,
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}