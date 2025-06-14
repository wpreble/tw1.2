// Placeholder Page
export default function SettingsPage() {
  return (
    <div className="p-6 md:p-10 text-obsidianBlack dark:text-parchmentOffWhite">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-serif mb-2">Settings</h1>
        <p className="text-lg text-mistGrey">Configure your experience with The Way.</p>
      </header>
      <div className="max-w-xl mx-auto bg-pureWhite dark:bg-obsidianBlack/50 p-6 md:p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-serif mb-4 text-greyBlue">Preferences</h2>
        <p className="text-sm text-mistGrey">Settings options will be available here soon.</p>
        {/* Theme toggle could be here too, or notification settings etc. */}
      </div>
    </div>
  )
}
