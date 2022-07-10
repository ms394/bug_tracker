import React from "react";

export default function Tags({ title, tags, id, value, removeTag }) {
  return (
    <div className="tags">
      <span className="title">{title}</span>
      {tags.length
        ? tags.map((tag) => (
            <div className="tag" key={tag[id]}>
              <span className="tagValue">{tag[value]}</span>
              <span className="cross" onClick={removeTag} id={tag[id]}>
                &#10006;
              </span>
            </div>
          ))
        : ""}
    </div>
  );
}
