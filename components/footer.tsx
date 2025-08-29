export default function Footer() {
  return (
    <footer className="bg-[#293132] text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Houtcore. Alle rechten voorbehouden.</p>
        <p className="mt-2 text-sm text-gray-400">Ambachtelijk maatwerk in hout</p>
      </div>
    </footer>
  )
}
