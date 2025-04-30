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

function Favorites(props:any) {
    return (
        <aside className="fixed bottom-0 p-2">
            <h2>Favorites</h2>
            <div className="flex gap-2">
                <FavoritesButton onClick={() => {props.use_favorite('simple')}}>Simple</FavoritesButton>
                <FavoritesButton onClick={() => {props.use_favorite('brown')}}>Alton Brown</FavoritesButton>
            </div>
        </aside>
    )
}

export default Favorites