export const Header = () => {
  return (
    <header className="flex items-center justify-between p-2 border-b bg-white">
      <PlayerControls />
      <NowPlaying />
      <UserMenu />
    </header>
  );
};
