export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen dark:text-white text-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg">Page Not Found</p>
        <p className="text-sm mt-2">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}
