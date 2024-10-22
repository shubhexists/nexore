export function SettingsContent({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="py-6">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <p className="text-sm">Account settings and preferences</p>
      </div>
    </div>
  );
}
