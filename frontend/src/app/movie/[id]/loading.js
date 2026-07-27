export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="text-center">

        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>

        <p className="mt-6 text-white text-xl">
          Loading Movie...
        </p>

      </div>

    </main>
  );
}