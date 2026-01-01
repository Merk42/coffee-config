import { FavoritesInterface } from "./types";
import { BUTTON_BASE } from "./styling";

interface ButtonProps {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

type UpdateFavoriteFunction = (event: string) => void;

function FavoritesButton({ children, onClick,}:ButtonProps) {
    return (
      <button
        type="button"
        className={BUTTON_BASE}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

function Favorites({updateFavorite, favorites}:{updateFavorite:UpdateFavoriteFunction, favorites:FavoritesInterface}) {
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