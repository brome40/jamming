import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

const TrackList = ({ tracks, onAdd, isRemoval }) => {
  return (
    <div className="TrackList">
      {tracks.map(track => {
        return <Track
          track={track}
          key={track.id}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />;
      })}
    </div>
  );
};

export default TrackList;
