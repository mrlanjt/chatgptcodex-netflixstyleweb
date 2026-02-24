import type { Movie } from '../types';

type ModalProps = {
  movie: Movie;
  onClose: () => void;
};

export function Modal({ movie, onClose }: ModalProps) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <img src={movie.poster} alt={movie.title} />
        <div>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <small>{movie.year} • {movie.category}</small>
          <button type="button" className="primary-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
