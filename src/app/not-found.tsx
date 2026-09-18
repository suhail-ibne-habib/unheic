import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold text-blue-600">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-sm text-slate-500">
        That URL does not exist. Head back to the image converter.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Convert images
      </Link>
    </div>
  );
}
