export function NFTsContent({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="py-6">
      <h3 className="text-lg font-semibold mb-4">Your NFT Collection</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className={`aspect-square rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
        <div className={`aspect-square rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
      </div>
    </div>
  );
}