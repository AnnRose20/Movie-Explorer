"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="text-center">

        <h1 className="text-4xl font-bold text-red-500">
          Something went wrong
        </h1>

        <p className="mt-4 text-gray-300">
          {error.message}
        </p>

        <button
          onClick={() => reset()}
          className="mt-8 rounded-lg bg-red-600 px-6 py-3 hover:bg-red-700"
        >
          Try Again
        </button>

      </div>

    </main>
  );
}