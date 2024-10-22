export function ActivityContent({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="py-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} mb-3`}>
        <p className="text-sm">No recent activity</p>
      </div>
    </div>
  );
}
