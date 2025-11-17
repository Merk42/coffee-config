import { FavoritesInterface } from "./types";

interface ButtonProps {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function FavoritesButton({ children, onClick,}:ButtonProps) {
    return (
      <button
        type="button"
        className="cursor-pointer grow text-center border-yellow-800 border-2 p-2 rounded-md peer-checked:bg-yellow-800 peer-checked:text-white"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

function Favorites({updateFavorite, favorites}:{updateFavorite:Function, favorites:FavoritesInterface}) {
  return (
    <aside className="fixed w-full max-w-3xl bottom-0 p-2 bg-white dark:bg-black">
      <h2>Favorites</h2>
      <div className="inline-flex gap-2">
      {Object.entries(favorites).map(([key, value]) => (
        <FavoritesButton key={key} onClick={() => {updateFavorite(key)}}>{value.label}</FavoritesButton>
      ))}
      </div>
    </aside>
  )
}

export default Favorites